/**
 * ============================================================
 * 页脚组件 — 网站全局页脚
 * 四列布局：
 *   公司简介 + 快速链接 + 联系方式 + 工作时间
 * 底部栏：版权信息 + 隐私政策 / 服务条款链接
 * 渲染位置：src/app/layout.tsx → LayoutWrapper → 所有页面底部
 * ============================================================
 */

"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
                <span className="text-navy-900 font-heading font-bold text-lg">
                  {t("company.shortName")}
                </span>
              </div>
              <div>
                <p className="font-heading font-bold text-lg leading-tight">
                  {t("company.name")}
                </p>
                <p className="text-xs text-gray-400 leading-tight">
                  {t("company.tagline")}
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              {[
                ["/", "nav.home"],
                ["/cars", "nav.cars"],
                ["/history", "nav.history"],
                ["/about", "nav.about"],
                ["/contact", "nav.contact"],
              ].map(([href, labelKey]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-gold-400 text-sm transition-colors"
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">
              {t("footer.contactInfo")}
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-gold-400 mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>{t("company.email")}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-gold-400 mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>
                  {t("company.address")}
                </span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">
              {t("footer.hours")}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{t("footer.weekday")}</li>
              <li className="text-white font-medium">{t("footer.time")}</li>
              <li className="text-gray-400">{t("footer.timezone")}</li>
              <li className="mt-3">
                <span className="text-gold-400 font-semibold">
                  {t("footer.reply")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {t("footer.company")}. {t("footer.rights")}
          </p>
          <div className="flex gap-4">
            {[t("common.privacy"), t("common.terms")].map((text) => (
              <Link
                key={text}
                href="#"
                className="text-gray-500 hover:text-gold-400 text-sm transition-colors"
              >
                {text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
