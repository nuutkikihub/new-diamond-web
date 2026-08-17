import type { Metadata } from "next";
import "./globals.css";
import "./header-overrides.css";
import "./hero-overrides.css";
import "./about-overrides.css";
import "./video-overrides.css";
import "./gallery-overrides.css";
import "./product-overrides.css";
import "./quality-overrides.css";
import "./contact-overrides.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://newdiamondstarch.com"),
  title: "New Diamond Starch Co., Ltd.",
  description: "ผู้ผลิตแป้งมันสำปะหลังมาตรฐานสากล ด้วยประสบการณ์กว่า 50 ปี",
  openGraph: {
    title: "New Diamond Starch Co., Ltd.",
    description: "International Standard Tapioca Starch — 50+ Years Experience",
    images: [{ url: "/og.png", width: 1740, height: 904 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Diamond Starch Co., Ltd.",
    description: "International Standard Tapioca Starch — 50+ Years Experience",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
