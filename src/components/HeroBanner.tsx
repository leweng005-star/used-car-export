/**
 * ============================================================
 * 首页轮播大图 — 限时特价车专区
 * 功能：
 *   - 自动轮播（5秒切换），底部圆点可手动点击跳转
 *   - 展示 featured: true 的特价车型（品牌/型号/年份/价格）
 *   - 两个 CTA 按钮：查看详情（跳详情页）+ 查看全部车源（跳列表页）
 * 数据配置：组件内 slides 数组（可改为从 cars.json 读取 featured 车辆）
 * ============================================================
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

interface Slide {
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  taglineKey: string;
}

const slides: Slide[] = [
  {
    slug: "toyota-camry-2022",
    brand: "Toyota",
    model: "Camry SE",
    year: 2022,
    price: 21500,
    image: "/images/hero-car-1.jpg",
    taglineKey: "Best-selling mid-size sedan — export ready",
  },
  {
    slug: "volkswagen-passat-2021",
    brand: "Volkswagen",
    model: "Passat 330TSI",
    year: 2021,
    price: 16800,
    image: "/images/hero-car-2.jpg",
    taglineKey: "German engineering at unbeatable prices",
  },
  {
    slug: "honda-accord-2022",
    brand: "Honda",
    model: "Accord 1.5T",
    year: 2022,
    price: 19500,
    image: "/images/hero-car-3.jpg",
    taglineKey: "Reliable, efficient, and always in demand",
  },
];

export default function HeroBanner() {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  const slide = slides[current];

  return (
    <section className="relative h-[600px] md:h-[700px] bg-navy-900 overflow-hidden">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 to-navy-900/60 z-10" />
      <div className="absolute inset-0 bg-navy-800" />

      {/* Slide Content */}
      <div className="relative z-20 container-custom h-full flex items-center">
        <div className="max-w-2xl">
          <span className="inline-block bg-gold-500 text-white text-sm font-semibold px-4 py-1 rounded-full mb-6">
            {t("hero.badge")}
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
            {slide.brand} {slide.model}
            <span className="block text-gold-400 text-2xl md:text-3xl mt-2">
              {slide.year} — {t("car.exportPrice")} {t("common.usd")}{" "}
              {slide.price.toLocaleString()}
            </span>
          </h1>
          {slide.taglineKey && (
            <p className="text-gray-300 text-lg md:text-xl mb-8">
              {slide.taglineKey}
            </p>
          )}
          <div className="flex gap-4">
            <Link
              href={`/cars/${slide.slug}`}
              className="btn-primary text-lg"
            >
              {t("car.viewDetails")}
            </Link>
            <Link
              href="/cars"
              className="inline-block border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-navy-900 transition-all duration-300"
            >
              {t("hero.cta")}
            </Link>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-gold-500 w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`${t("common.slide")} ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
