import { cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "dist", "client");
const target = path.join(root, "site");

await readdir(source);
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true });

// GitHub Pages has no Apache .htaccess. Directory index files keep clean URLs
// such as /en and /activities working on a static host.
for (const entry of await readdir(target, { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith(".html") || entry.name === "404.html") {
    continue;
  }

  const route = entry.name.slice(0, -".html".length);
  if (route === "index") continue;

  const routeDirectory = path.join(target, route);
  await mkdir(routeDirectory, { recursive: true });
  await cp(path.join(target, entry.name), path.join(routeDirectory, "index.html"));
}

await cp(path.join(root, "CNAME"), path.join(target, "CNAME"));
console.log("Prepared GitHub Pages files in site/");
