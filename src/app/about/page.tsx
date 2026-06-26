/**
 * ============================================================
 * 关于我们页面 — 公司介绍（路由：/about）
 * 内容区块：
 *   1. 公司简介（山东解放进出口有限公司）
 *   2. 一站式出口服务流程（5步：寻源→检测→定价→报关→物流）
 *   3. 企业资质展示（营业执照/出口资质/全球合作伙伴）
 *   4. 信任声明
 * ============================================================
 */

"use client";

import { useLang } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLang();

  const processes = [1, 2, 3, 4, 5];

  return (
    <div>
      <section className="bg-navy-900 py-16 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{t("about.title")}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{t("about.subtitle")}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-navy-900 mb-6">{t("about.companyName")}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{t("about.intro1")}</p>
              <p className="text-gray-600 leading-relaxed">{t("about.intro2")}</p>
            </div>
            <div className="bg-gradient-to-br from-navy-700 to-navy-900 rounded-xl h-80 flex items-center justify-center">
              <div className="text-center text-white/30">
                <svg className="w-20 h-20 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-sm">{t("about.companyPhoto")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-5xl">
          <h2 className="text-3xl font-heading font-bold text-navy-900 text-center mb-12">{t("about.processTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processes.map((n) => (
              <div key={n} className="text-center">
                <div className="w-14 h-14 bg-gold-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-heading font-bold text-lg">
                  {String(n).padStart(2, "0")}
                </div>
                <h3 className="font-heading font-bold text-navy-900 mb-2">{t(`about.process${n}.title`)}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t(`about.process${n}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-heading font-bold text-navy-900 text-center mb-12">{t("about.credentialsTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="card p-6 text-center">
                <div className="flex justify-center mb-4">
                  <svg className="w-10 h-10 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {n === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />}
                    {n === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />}
                    {n === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-navy-900 mb-2">{t(`about.cred${n}.title`)}</h3>
                <p className="text-sm text-gray-500">{t(`about.cred${n}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-900 text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-heading font-bold mb-6">{t("about.trustTitle")}</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{t("about.trustDesc")}</p>
        </div>
      </section>
    </div>
  );
}
