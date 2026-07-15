import type { Metadata } from "next";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const notoSans = Noto_Sans_TC({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const notoSerif = Noto_Serif_TC({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kintsugi Studio ｜ 繕物誌",
  description:
    "以金繕哲學，擁抱裂痕與不完美，將其轉化為獨特的光芒。手作選品與體驗工作坊。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${notoSans.variable} ${notoSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
