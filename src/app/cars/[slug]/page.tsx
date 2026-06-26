/**
 * ============================================================
 * 车辆详情页 — 单台车的完整信息展示（路由：/cars/[slug]）
 * 页面结构：
 *   左侧（2/3）— 图片画廊 → 车辆参数表 → 车况介绍
 *   右侧（1/3）— 出口价格 + 快速参数 + 在线询盘表单
 * 数据来源：src/data/cars.json（通过 URL 中的 slug 匹配）
 * ============================================================
 */

"use client";

import { useParams } from "next/navigation";
import { notFound } from "next";
import Link from "next/link";
import { getCarBySlug } from "@/lib/cars";
import ImageGallery from "@/components/ImageGallery";
import InquiryForm from "@/components/InquiryForm";
import { useLang } from "@/context/LanguageContext";

export default function CarDetailPage() {
  const { t } = useLang();
  const params = useParams();
  const slug = params.slug as string;
  const car = getCarBySlug(slug);
  if (!car) notFound();

  return (
    <div>
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container-custom py-3">
          <nav className="flex gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gold-500 transition-colors">{t("car.breadcrumbHome")}</Link>
            <span>/</span>
            <Link href="/cars" className="hover:text-gold-500 transition-colors">{t("car.breadcrumbCars")}</Link>
            <span>/</span>
            <span className="text-navy-700 font-medium">{car.brand} {car.model}</span>
          </nav>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <ImageGallery images={car.images} title={`${car.brand} ${car.model}`} />

              <div className="mt-10">
                <h2 className="text-2xl font-heading font-bold text-navy-900 mb-6">{t("car.specifications")}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(car.specs).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-4">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        {t(`spec.${key}`)}
                      </p>
                      <p className="text-sm font-semibold text-navy-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-heading font-bold text-navy-900 mb-6">{t("car.condition")}</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{car.condition}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="sticky top-24">
                <div className="card p-6 border border-gray-200">
                  <div className="text-center mb-6 pb-6 border-b border-gray-200">
                    <p className="text-sm text-gray-500 mb-1">{t("car.exportPrice")}</p>
                    <p className="text-4xl font-heading font-bold text-gold-500">
                      {t("common.usd")} {car.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{t("car.fobNote")}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      [t("car.brand"), car.brand],
                      [t("car.model"), car.model],
                      [t("car.year"), car.year],
                      [t("car.mileage"), `${car.mileage.toLocaleString()} ${t("common.km")}`],
                      [t("car.transmission"), car.specs.transmission],
                      [t("car.drivetrain"), car.specs.drivetrain],
                      [t("car.fuelType"), car.specs.fuelType],
                      [t("car.color"), car.specs.color],
                    ].map(([label, value]) => (
                      <div key={String(label)} className="flex justify-between text-sm">
                        <span className="text-gray-500">{label}</span>
                        <span className="font-semibold text-navy-900">{value}</span>
                      </div>
                    ))}
                  </div>

                  <InquiryForm carSlug={car.slug} carName={`${car.brand} ${car.model}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
