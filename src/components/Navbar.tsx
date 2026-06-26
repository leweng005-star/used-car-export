/**
 * ============================================================
 * 顶部导航栏 — 网站全局导航组件
 * 包含：
 *   - 左侧 Logo（山东解放 JF）
 *   - 中间导航链接（首页/特价车源/价格参考/关于我们/联系我们）
 *   - 右侧 语言切换按钮 + 登录按钮 + CTA 按钮
 *   - 移动端汉堡菜单（lg 屏幕以下自动折叠）
 * 渲染位置：src/app/layout.tsx → LayoutWrapper → 所有页面顶部
 * ============================================================
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    ["/", t("nav.home")],
    ["/cars", t("nav.cars")],
    ["/history", t("nav.history")],
    ["/about", t("nav.about")],
    ["/contact", t("nav.contact")],
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-navy-700 rounded-lg flex items-center justify-center">
              <span className="text-gold-500 font-heading font-bold text-lg">
                {t("company.shortName")}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="font-heading font-bold text-navy-700 text-lg leading-tight">
                {t("company.name")}
              </p>
              <p className="text-xs text-gray-500 leading-tight">
                {t("company.tagline")}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-gray-600 hover:text-gold-500 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right: Language + Login + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/auth/login"
              className="text-sm font-medium text-navy-700 hover:text-gold-500 transition-colors"
            >
              {t("nav.login")}
            </Link>
            <Link href="/cars" className="btn-primary text-sm py-2 px-5">
              {t("nav.cars")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-600"
            aria-label={t("common.toggleMenu")}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-6 border-t border-gray-100">
            <nav className="flex flex-col gap-2 pt-4">
              {navLinks.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-2 mt-2">
                <Link
                  href="/auth/login"
                  className="block px-4 py-2 text-sm font-medium text-navy-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("nav.login")}
                </Link>
                <div className="px-4 py-2">
                  <LanguageSwitcher />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
