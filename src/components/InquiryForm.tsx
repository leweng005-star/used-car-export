/**
 * ============================================================
 * 在线询盘表单 — 车辆详情页右侧的询价表单
 * 表单字段：姓名 / 邮箱 / 公司 / 留言
 * 提交后显示成功提示（目前仅 console.log，未接入后端 API）
 * ⚠ 改造方向：接入邮件服务或后端 API 实现真实询盘发送
 * ============================================================
 */

"use client";

import { useState } from "react";
import { useLang } from "@/context/LanguageContext";

export default function InquiryForm({ carSlug, carName }: { carSlug: string; carName: string }) {
  const { t } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Inquiry:", { carSlug, carName, name, email, company, message });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-green-700 font-semibold">{t("inquiry.success")}</p>
        <p className="text-green-600 text-sm mt-1">{t("inquiry.successDesc")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-heading font-bold text-navy-900 text-lg mb-4">{t("inquiry.title")}</h3>
      <div className="space-y-3">
        <input type="text" placeholder={t("inquiry.name")} value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
        <input type="email" placeholder={t("inquiry.email")} value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
        <input type="text" placeholder={t("inquiry.company")} value={company} onChange={(e) => setCompany(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
        <textarea placeholder={t("inquiry.message", { car: carName })} value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none" />
        <button type="submit" className="btn-primary w-full text-center">{t("inquiry.submit")}</button>
      </div>
    </form>
  );
}
