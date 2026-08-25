import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the New Diamond Starch Thai homepage", async () => {
  const response = await render("/th");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>New Diamond Starch Co\., Ltd\.<\/title>/i);
  assert.match(html, /แป้งมันสำปะหลัง/);
  assert.match(html, /150,000/);
  assert.match(html, /ส่งออกกว่า 14 ประเทศทั่วโลก/);
  assert.match(html, /บริษัท หวังดี เอ็นเนอยี จำกัด/);
  assert.match(html, /Waste to Energy/);
  assert.match(html, /\/images\/about-company\.jpg/);
  assert.match(html, /\/images\/ship\.jpg/);
  assert.match(html, /Show WeChat QR code/);
  assert.doesNotMatch(html, /codex-preview|Building your site/i);
});

test("renders all three language routes", async () => {
  const routes = [
    ["/th", /รู้จักนิวไดมอนด์ สตาร์ชให้มากขึ้น/],
    ["/en", /Discover New Diamond Starch/],
    ["/zh", /进一步了解新钻石淀粉/],
  ];

  for (const [pathname, expected] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(await response.text(), expected, pathname);
  }
});

test("includes the interactive gallery and QR code assets", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /setActiveGalleryIndex/);
  assert.match(page, /onClick=\{\(\)=>setActiveGalleryIndex\(index\)\}/);
  assert.match(page, /activeGalleryIndex !== null/);
  assert.match(page, /className="gallery-modal"/);
  assert.match(page, /role="dialog"/);
  assert.match(page, /event\.key === "Escape"/);
  assert.match(page, /setActiveWangDeeIndex/);
  assert.match(page, /wangDeeImages\.map/);

  await Promise.all([
    "wechat.jpg",
    "line.jpg",
    "whatsapp.jpg",
  ].map((name) => access(new URL(`../public/images/contact-qr/${name}`, import.meta.url))));

  await Promise.all(Array.from({ length: 11 }, (_, index) =>
    access(new URL(`../public/images/wang-dee/wang-dee-${String(index + 1).padStart(2, "0")}.jpg`, import.meta.url)),
  ));
});
