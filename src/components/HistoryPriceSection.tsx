/**
 * ============================================================
 * 首页历史成交价模块 — 经典车型历年出口价格参考
 * 功能：
 *   - 年份 Tab 切换（2021/2022/2023）
 *   - 每一年份展示 4 款经典车型的价格卡片（均价 + 价格区间）
 *   - 底部「查看完整价格参考」按钮跳转 /history
 * 数据：组件内硬编码 historyData（与 /history 页面数据独立维护）
 * ============================================================
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

interface PriceEntry {
  model: string;
  avgPrice: number;
  range: [number, number];
}

const historyData: Record<number, PriceEntry[]> = {
  2021: [
    { model: "Volkswagen Passat", avgPrice: 12500, range: [10800, 14200] },
    { model: "Toyota Corolla", avgPrice: 9500, range: [8200, 10800] },
    { model: "Toyota Camry", avgPrice: 15800, range: [13800, 17800] },
    { model: "Honda Accord", avgPrice: 14500, range: [12500, 16500] },
  ],
  2022: [
    { model: "Volkswagen Passat", avgPrice: 14200, range: [12500, 15900] },
    { model: "Toyota Corolla", avgPrice: 10800, range: [9500, 12100] },
    { model: "Toyota Camry", avgPrice: 17200, range: [15200, 19200] },
    { model: "Honda Accord", avgPrice: 16000, range: [14000, 18000] },
  ],
  2023: [
    { model: "Volkswagen Passat", avgPrice: 15800, range: [14000, 17600] },
    { model: "Toyota Corolla", avgPrice: 12000, range: [10500, 13500] },
    { model: "Toyota Camry", avgPrice: 18800, range: [16800, 20800] },
    { model: "Honda Accord", avgPrice: 17500, range: [15500, 19500] },
  ],
};

const availableYears = Object.keys(historyData).map(Number).sort().reverse();

export default function HistoryPriceSection() {
  const { t } = useLang();
  const [activeYear, setActiveYear] = useState(availableYears[0]);
  const entries = historyData[activeYear] || [];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 mb-4">
            {t("history.title")}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t("history.subtitle")}
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {availableYears.map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-8 py-3 rounded-lg font-heading font-bold text-lg transition-all duration-300 ${
                activeYear === year
                  ? "bg-navy-700 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {entries.map((entry) => (
            <div key={entry.model} className="card p-6 border border-gray-100">
              <h3 className="font-heading font-bold text-navy-900 text-lg mb-3">
                {entry.model}
              </h3>
              <div className="text-gold-500 font-heading font-bold text-3xl mb-3">
                {t("common.usd")} {entry.avgPrice.toLocaleString()}
              </div>
              <p className="text-gray-500 text-sm mb-4">{t("history.avgPrice")}</p>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">{t("history.priceRange")}</p>
                <p className="text-sm font-semibold text-gray-700">
                  {t("common.usd")} {entry.range[0].toLocaleString()} — {t("common.usd")}{" "}
                  {entry.range[1].toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/history" className="btn-secondary">
            {t("history.viewDetails")}
          </Link>
        </div>
      </div>
    </section>
  );
}
