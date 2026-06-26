/**
 * ============================================================
 * 布局包裹组件 — 桥接服务端 RootLayout 和客户端 Navbar/Footer
 * 为什么需要？RootLayout 是服务器组件，无法直接使用 useLang()，
 * 所以用这个客户端中间层来读取语言状态并传递给 Navbar/Footer
 * 结构：Navbar → <main>{页面内容}</main> → Footer
 * ============================================================
 */

"use client";

import { useLang } from "@/context/LanguageContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { lang } = useLang();

  return (
    <>
      <Navbar />
      <main className="flex-1" lang={lang}>{children}</main>
      <Footer />
    </>
  );
}
