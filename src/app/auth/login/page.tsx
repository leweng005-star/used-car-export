/**
 * ============================================================
 * 登录页面 — 经销商账户登录（路由：/auth/login）
 * 表单字段：邮箱 + 密码
 * 底部链接：跳转注册页 /auth/register
 * ⚠ 目前为前端展示版本，后端认证逻辑尚未接入
 * ============================================================
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export default function LoginPage() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); console.log("Login:", { email, password }); };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-navy-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-gold-500 font-heading font-bold text-2xl">JF</span>
            </div>
            <h1 className="text-2xl font-heading font-bold text-navy-900">{t("auth.loginTitle")}</h1>
            <p className="text-gray-500 text-sm mt-1">{t("auth.loginSubtitle")}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1">{t("auth.email")}</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("auth.emailPlaceholder")} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1">{t("auth.password")}</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("auth.passwordPlaceholder")} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
            </div>
            <button type="submit" className="btn-primary w-full text-center">{t("auth.submitLogin")}</button>
          </form>
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-500">{t("auth.noAccount")} <Link href="/auth/register" className="text-gold-500 font-semibold hover:underline">{t("auth.registerLink")}</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
