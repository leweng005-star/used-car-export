/**
 * ============================================================
 * 联系我们页面 — 联系方式和在线留言（路由：/contact）
 * 内容：
 *   左侧 — 邮箱、地址、WhatsApp、工作时间
 *   右侧 — 在线留言表单（姓名/邮箱/公司/主题/内容）
 * ============================================================
 */

"use client";

import { useState } from "react";
import { useLang } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLang();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div>
      <section className="bg-navy-900 py-16 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{t("contact.title")}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{t("contact.subtitle")}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-heading font-bold text-navy-900 mb-8">{t("contact.getInTouch")}</h2>
              <div className="space-y-6">
                {[
                  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />, title: t("contact.email"), body: t("company.email"), note: t("contact.emailReply") },
                  { icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>, title: t("contact.address"), body: t("company.address") },
                  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />, title: t("contact.whatsapp"), body: t("contact.whatsappComing"), note: "", muted: true },
                  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />, title: t("contact.hours"), body: t("contact.hoursValue"), note: t("contact.hoursTz") },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold-500/10 rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900 mb-1">{item.title}</h3>
                      {item.muted ? (
                        <p className="text-gray-400 italic">{item.body}</p>
                      ) : (
                        <p className="text-gray-600 leading-relaxed">{item.body}</p>
                      )}
                      {item.note && <p className="text-xs text-gray-400 mt-1">{item.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-navy-900 mb-8">{t("contact.formTitle")}</h2>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <svg className="w-14 h-14 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-heading font-bold text-green-700 mb-2">{t("contact.successTitle")}</h3>
                  <p className="text-green-600">{t("contact.successDesc")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    [t("contact.name"), t("contact.namePlaceholder"), "text", true],
                    [t("contact.emailLabel"), t("contact.emailPlaceholder"), "email", true],
                    [t("contact.company"), t("contact.companyPlaceholder"), "text", false],
                    [t("contact.subject"), t("contact.subjectPlaceholder"), "text", true],
                  ].map(([label, placeholder, type, required]) => (
                    <div key={String(label)}>
                      <label className="block text-sm font-medium text-navy-900 mb-1">{label}</label>
                      <input type={String(type)} required={Boolean(required)} placeholder={String(placeholder)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-navy-900 mb-1">{t("contact.message")}</label>
                    <textarea required rows={5} placeholder={t("contact.messagePlaceholder")} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none" />
                  </div>
                  <button type="submit" className="btn-primary w-full text-center">{t("contact.submit")}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
