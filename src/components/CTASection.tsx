/**
 * ============================================================
 * CTA 行动号召组件 — 首页底部引导区域
 * 深蓝渐变背景 + 白色文字
 * 两个按钮：探索特价车源 → /cars / 联系我们的团队 → /contact
 * 作用：引导访客从首页进入核心转化页面
 * ============================================================
 */

"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export default function CTASection() {
  const { t } = useLang();

  return (
    <section className="section-padding bg-gradient-to-r from-navy-700 to-navy-900 text-white text-center">
      <div className="container-custom max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          {t("cta.title")}
        </h2>
        <p className="text-gray-300 text-lg mb-8">
          {t("cta.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/cars" className="btn-primary text-lg">
            {t("cta.button")}
          </Link>
          <Link
            href="/contact"
            className="inline-block border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-navy-900 transition-all duration-300"
          >
            {t("nav.contact")}
          </Link>
        </div>
      </div>
    </section>
  );
}
