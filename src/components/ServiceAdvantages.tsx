/**
 * ============================================================
 * 三大服务优势模块 — 首页核心卖点展示
 * 三列图标卡片：
 *   ① Premium Vehicle Sources — 优质车源保障
 *   ② Vehicle Condition Guarantee — 车况质量保证
 *   ③ Flexible Purchase Process — 灵活采购流程
 * 特点：卡片 hover 时上浮效果，SVG 图标 + 标题 + 描述
 * ============================================================
 */

"use client";

import { useLang } from "@/context/LanguageContext";

export default function ServiceAdvantages() {
  const { t } = useLang();

  const advantages = [
    {
      icon: (
        <svg className="w-12 h-12 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      titleKey: "advantages.sourcing.title",
      descKey: "advantages.sourcing.desc",
    },
    {
      icon: (
        <svg className="w-12 h-12 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      titleKey: "advantages.guarantee.title",
      descKey: "advantages.guarantee.desc",
    },
    {
      icon: (
        <svg className="w-12 h-12 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      titleKey: "advantages.process.title",
      descKey: "advantages.process.desc",
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 mb-4">
            {t("advantages.title")}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t("advantages.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((adv, i) => (
            <div key={i} className="card p-8 text-center hover:-translate-y-1">
              <div className="flex justify-center mb-6">{adv.icon}</div>
              <h3 className="text-xl font-heading font-bold text-navy-900 mb-4">
                {t(adv.titleKey)}
              </h3>
              <p className="text-gray-600 leading-relaxed">{t(adv.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
