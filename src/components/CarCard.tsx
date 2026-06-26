/**
 * ============================================================
 * 车辆卡片组件 — 用于车辆列表页的单个车辆展示
 * 展示内容：
 *   图片区域（品牌标签 + 可售标识）+ 品牌型号 + 年份里程 + 出口价格
 * 交互：hover 上浮阴影 + 价格文字变金色 + 箭头微动
 * 点击 → 导航到 /cars/[slug] 车辆详情页
 * ============================================================
 */

"use client";

import Link from "next/link";
import type { Car } from "@/lib/cars";
import { useLang } from "@/context/LanguageContext";

export default function CarCard({ car }: { car: Car }) {
  const { t } = useLang();

  return (
    <Link href={`/cars/${car.slug}`} className="card group">
      <div className="relative h-56 bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        <svg
          className="w-20 h-20 text-white/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
        <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {t("cars.available")}
        </span>
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
            {car.brand}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-heading font-bold text-lg text-navy-900 mb-2 group-hover:text-gold-500 transition-colors">
          {car.brand} {car.model}
        </h3>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {car.year}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            {car.mileage.toLocaleString()} {t("common.km")}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">{t("cars.exportPrice")}</p>
            <p className="text-2xl font-heading font-bold text-gold-500">
              {t("common.usd")} {car.price.toLocaleString()}
            </p>
          </div>
          <span className="text-gold-500 group-hover:translate-x-1 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
