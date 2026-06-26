/**
 * ============================================================
 * 会员中心 — 用户个人面板（路由：/dashboard）
 * 内容：
 *   - 顶部统计卡片（收藏数量/询盘数量/账户类型）
 *   - 我的收藏列表（占位，需登录功能接入后实现）
 *   - 询盘记录列表（占位，需登录功能接入后实现）
 * ⚠ 目前为展示版本，数据为静态占位
 * ============================================================
 */

"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export default function DashboardPage() {
  const { t } = useLang();

  return (
    <div>
      <section className="bg-navy-900 py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">{t("dashboard.title")}</h1>
          <p className="text-gray-300">{t("dashboard.subtitle")}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { label: t("dashboard.saved"), value: "0", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /> },
              { label: t("dashboard.inquiries"), value: "0", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /> },
              { label: t("dashboard.accountType"), value: t("dashboard.free"), icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> },
            ].map((stat) => (
              <div key={stat.label} className="card p-6 flex items-center gap-4">
                <div className="w-14 h-14 bg-gold-50 rounded-lg flex items-center justify-center text-gold-500">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">{stat.icon}</svg>
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-navy-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              [<path key="f" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />, t("dashboard.favoritesTitle"), t("dashboard.noFavorites")],
              [<path key="i" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />, t("dashboard.inquiriesTitle"), t("dashboard.noInquiries")],
            ].map(([icon, title, desc]) => (
              <div key={String(title)} className="card p-8 text-center">
                <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
                <h3 className="text-lg font-heading font-bold text-navy-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm mb-4">{desc}</p>
                <Link href="/cars" className="btn-secondary text-sm py-2 px-4">{t("cars.browseVehicles")}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
