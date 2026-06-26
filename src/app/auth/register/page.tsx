/**
 * ============================================================
 * 注册页面 — 经销商账户注册（路由：/auth/register）
 * 表单字段：姓名 + 公司名称 + 邮箱 + 密码 + 确认密码
 * 底部链接：跳转登录页 /auth/login
 * ⚠ 目前为前端展示版本，后端注册逻辑尚未接入
 * ============================================================
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export default function RegisterPage() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); console.log("Register:", { name, company, email, password, confirmPassword }); };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-navy-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-gold-500 font-heading font-bold text-2xl">JF</span>
            </div>
            <h1 className="text-2xl font-heading font-bold text-navy-900">{t("auth.registerTitle")}</h1>
            <p className="text-gray-500 text-sm mt-1">{t("auth.registerSubtitle")}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1">{t("auth.name")}</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder={t("auth.namePlaceholder")} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1">{t("auth.company")}</label>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder={t("auth.companyPlaceholder")} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1">{t("auth.email")}</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("auth.emailPlaceholder")} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1">{t("auth.password")}</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("auth.passwordHint")} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1">{t("auth.confirmPassword")}</label>
              <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={t("auth.confirmPlaceholder")} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
            </div>
            <button type="submit" className="btn-primary w-full text-center">{t("auth.submitRegister")}</button>
          </form>
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-500">{t("auth.hasAccount")} <Link href="/auth/login" className="text-gold-500 font-semibold hover:underline">{t("auth.loginLink")}</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
