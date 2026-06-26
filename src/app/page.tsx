/**
 * ============================================================
 * 首页 — 网站的门面页面（路由：/）
 * 页面结构从上到下：
 *   1. HeroBanner        — 限时特价车轮播大图（全宽，自动切换）
 *   2. ServiceAdvantages — 三大服务优势（优质车源/车况保障/灵活采购）
 *   3. HistoryPriceSection — 经典车型历史成交价参考（按年份切换）
 *   4. CTASection        — 底部行动号召（引导进入车源列表）
 * ============================================================
 */

import HeroBanner from "@/components/HeroBanner";
import ServiceAdvantages from "@/components/ServiceAdvantages";
import HistoryPriceSection from "@/components/HistoryPriceSection";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <ServiceAdvantages />
      <HistoryPriceSection />
      <CTASection />
    </>
  );
}
