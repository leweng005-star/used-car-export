/**
 * ============================================================
 * 历史成交价参考页 — 经典车型历年出口价格（路由：/history）
 * 功能：
 *   - 顶部年份切换 Tab（2021/2022/2023）
 *   - 表格展示：车型 / 平均出口价格 / 价格区间 / 价差
 *   - 底部重要提示
 * 数据来源：src/data/history-prices.json → src/lib/cars.ts
 * ============================================================
 */

"use client";

import { useState } from "react";
import { getHistoryPrices } from "@/lib/cars";
import { useLang } from "@/context/LanguageContext";

const historyData = getHistoryPrices();
const availableYears = historyData.map((d) => d.year).sort((a, b) => b - a);

export default function HistoryPage() {
  const { t } = useLang();
  const [activeYear, setActiveYear] = useState(availableYears[0]);
  const yearData = historyData.find((d) => d.year === activeYear);

  return (
    <div>
      <section className="bg-navy-900 py-16 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{t("history.pageTitle")}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{t("history.pageSubtitle")}</p>
        </div>
      </section>

      <section className="bg-white border-b border-gray-200 sticky top-16 md:top-20 z-40">
        <div className="container-custom py-4">
          <div className="flex gap-4 justify-center">
            {availableYears.map((year) => (
              <button key={year} onClick={() => setActiveYear(year)} className={`px-8 py-3 rounded-lg font-heading font-bold text-lg transition-all duration-300 ${activeYear === year ? "bg-navy-700 text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {year}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-5xl">
          <div className="bg-white rounded-xl p-8 mb-10 text-center shadow-sm">
            <h2 className="text-2xl font-heading font-bold text-navy-900 mb-2">
              {activeYear} {t("history.yearTitle")}
            </h2>
            <p className="text-gray-500">{t("history.yearDesc")}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-navy-700 text-white">
                  <tr>
                    <th className="text-left px-6 py-4 font-heading font-semibold">{t("history.colModel")}</th>
                    <th className="text-center px-6 py-4 font-heading font-semibold">{t("history.colAvgPrice")}</th>
                    <th className="text-center px-6 py-4 font-heading font-semibold">{t("history.colRange")}</th>
                    <th className="text-center px-6 py-4 font-heading font-semibold">{t("history.colSpread")}</th>
                  </tr>
                </thead>
                <tbody>
                  {yearData?.models.map((entry, i) => {
                    const spread = entry.range[1] - entry.range[0];
                    return (
                      <tr key={entry.model} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-gold-50 transition-colors`}>
                        <td className="px-6 py-4"><span className="font-semibold text-navy-900">{entry.model}</span></td>
                        <td className="px-6 py-4 text-center"><span className="text-xl font-heading font-bold text-gold-500">USD {entry.avgPrice.toLocaleString()}</span></td>
                        <td className="px-6 py-4 text-center"><span className="text-gray-600">USD {entry.range[0].toLocaleString()} – USD {entry.range[1].toLocaleString()}</span></td>
                        <td className="px-6 py-4 text-center"><span className="text-sm text-gray-500">USD {spread.toLocaleString()}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-5">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-yellow-800 mb-1">{t("history.noteTitle")}</p>
                <p className="text-sm text-yellow-700">{t("history.noteDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
