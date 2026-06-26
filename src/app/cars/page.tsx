/**
 * ============================================================
 * 特价车源列表页 — 展示所有可出口的二手车（路由：/cars）
 * 功能：
 *   - 品牌筛选、年份筛选、价格排序
 *   - 以卡片网格形式展示每辆车（品牌/车型/年份/里程/价格）
 *   - 点击卡片跳转到车辆详情页 /cars/[slug]
 * 数据来源：src/data/cars.json → src/lib/cars.ts 工具函数
 * ============================================================
 */

"use client";

"use client";

import { useState } from "react";
import CarCard from "@/components/CarCard";
import { getAllCars, getAllBrands, getAllYears, getCarsByFilter } from "@/lib/cars";
import { useLang } from "@/context/LanguageContext";

export default function CarsPage() {
  const { t } = useLang();
  const allCars = getAllCars();
  const brands = getAllBrands();
  const years = getAllYears();

  const [brandFilter, setBrandFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filteredCars = getCarsByFilter({ brand: brandFilter, year: yearFilter, sort: sortBy });

  return (
    <div>
      <section className="bg-navy-900 py-16 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            {t("cars.title")}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {t("cars.subtitle")}
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-gray-200 sticky top-16 md:top-20 z-40">
        <div className="container-custom py-4">
          <div className="flex flex-wrap items-center gap-4">
            <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent">
              <option value="">{t("cars.allBrands")}</option>
              {brands.map((b) => (<option key={b} value={b}>{b}</option>))}
            </select>
            <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent">
              <option value="">{t("cars.allYears")}</option>
              {years.map((y) => (<option key={y} value={y}>{y}</option>))}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent">
              <option value="newest">{t("cars.sortNewest")}</option>
              <option value="price-asc">{t("cars.sortPriceLow")}</option>
              <option value="price-desc">{t("cars.sortPriceHigh")}</option>
            </select>
            <span className="text-sm text-gray-500 ml-auto">
              {filteredCars.length} {t("cars.found")}
            </span>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car) => (<CarCard key={car.slug} car={car} />))}
            </div>
          ) : (
            <div className="text-center py-20">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-heading font-bold text-gray-500 mb-2">{t("cars.noResults")}</h3>
              <p className="text-gray-400">{t("cars.noResultsDesc")}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
