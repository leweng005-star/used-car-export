/**
 * ============================================================
 * 语言切换按钮 — 中英文切换
 * 显示：当前是英文时显示"中文"，中文时显示"EN"
 * 点击 → 切换语言 → 存入 localStorage → 全站文字即时切换
 * 渲染位置：Navbar 右上角
 * ============================================================
 */

"use client";

import { useLang } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLang();

  const toggleLang = () => {
    setLang(lang === "en" ? "zh" : "en");
  };

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gold-500 transition-colors px-2 py-1 rounded border border-gray-200 hover:border-gold-400"
      aria-label={t(lang === "en" ? "common.switchToZh" : "common.switchToEn")}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="font-semibold">{t("nav.langSwitch")}</span>
    </button>
  );
}
