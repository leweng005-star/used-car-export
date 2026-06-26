/**
 * ============================================================
 * 图片画廊组件 — 车辆详情页的多图展示区域
 * 包含：主图占位区 + 左右切换箭头 + 底部缩略图圆点指示器
 * ⚠ 目前为静态占位版本，轮播切换逻辑尚未完成
 * 改进方向：接入 Swiper.js 或自定义 useState 实现图片切换
 * ============================================================
 */

"use client";

import { useLang } from "@/context/LanguageContext";

export default function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const { t } = useLang();
  return (
    <div className="bg-gradient-to-br from-navy-700 to-navy-900 rounded-xl overflow-hidden">
      <div className="h-80 md:h-96 flex items-center justify-center relative">
        <div className="text-center">
          <svg className="w-24 h-24 text-white/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-white/50 text-sm">{title}</p>
          <p className="text-white/30 text-xs mt-1">{images.length} {images.length > 1 ? t("common.images") : t("common.image")}</p>
        </div>
        <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="absolute bottom-4 flex gap-2">
          {images.map((_, i) => (<div key={i} className={`w-2.5 h-2.5 rounded-full ${i === 0 ? "bg-gold-500" : "bg-white/30"}`} />))}
        </div>
      </div>
    </div>
  );
}
