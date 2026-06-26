/**
 * ============================================================
 * 根布局组件 — 整个网站的 HTML 骨架
 * 职责：设置页面元数据（标题、描述）、加载 Google Fonts、
 *       包裹多语言 Provider 和全局布局（导航栏 + 页脚）
 * 位置：app/layout.tsx — Next.js App Router 的入口布局文件
 * ============================================================
 */

import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Shandong Jiefang - Used Car Export",
  description:
    "Premium used car export from China. Professional vehicle sourcing, inspection, and global shipping for international auto dealers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <LanguageProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
