/**
 * ============================================================
 * 多语言上下文 — 全站国际化核心模块 ⭐ 最重要
 * 功能：
 *   1. LanguageProvider — 在 RootLayout 中包裹整个应用
 *   2. useLang() Hook — 任何组件调用 { t } = useLang() 获取翻译
 *   3. t(key) 函数 — 根据当前语言返回对应文字
 *   4. setLang() — 切换语言，自动存入 localStorage 持久化
 * 使用示例：import { useLang } from "@/context/LanguageContext";
 *           const { t, lang, setLang } = useLang();
 *           <h1>{t("hero.title")}</h1>
 * 翻译字典：下方 translations 对象，en 英文 / zh 中文
 * 新增翻译 key 的方法：
 *   1. 在 translations.en 和 translations.zh 中分别添加同一条 key
 *   2. 在组件中使用 t("你的key") 即可
 * ============================================================
 */

"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "en" | "zh";

// Flattened translations for easy access
const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.cars": "Special Offers",
    "nav.history": "Price Reference",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.login": "Sign In",
    "nav.register": "Register",
    "nav.dashboard": "Dashboard",
    "nav.logout": "Sign Out",
    "nav.langSwitch": "中文",

    // Hero
    "hero.title": "Limited-Time Special Offers",
    "hero.subtitle": "Premium Used Cars at Export Prices",
    "hero.cta": "View All Deals",
    "hero.badge": "Limited-Time Special Offer",

    // Advantages
    "advantages.title": "Why Choose Us",
    "advantages.subtitle": "Three pillars of service excellence — trusted by auto dealers worldwide",
    "advantages.sourcing.title": "Premium Vehicle Sources",
    "advantages.sourcing.desc": "We rigorously select vehicles from trusted channels across China's automotive market. Every vehicle undergoes multi-point inspection before entering our inventory, ensuring only the best quality vehicles reach our international clients.",
    "advantages.guarantee.title": "Vehicle Condition Guarantee",
    "advantages.guarantee.desc": "Professional inspection reports with full transparency on vehicle condition. We provide detailed photos, verification documents, and a 90-day buyback guarantee — giving you complete confidence in every purchase.",
    "advantages.process.title": "Flexible Purchase Process",
    "advantages.process.desc": "Secure your vehicle with just a deposit payment. The remaining balance is only due when your vehicle passes export customs clearance — giving you financial flexibility and purchase protection throughout the entire process.",

    // History
    "history.title": "Historical Transaction Price Reference",
    "history.subtitle": "Classic models — past years' export prices to guide your purchasing decisions",
    "history.avgPrice": "Average Export Price",
    "history.priceRange": "Price Range",
    "history.viewDetails": "View Full Price Reference",

    // Common
    "common.km": "km",
    "common.usd": "USD",
    "common.image": "image",
    "common.images": "images",
    "common.privacy": "Privacy Policy",
    "common.terms": "Terms of Service",
    "common.toggleMenu": "Toggle menu",
    "common.slide": "Slide",
    "common.switchToZh": "Switch to Chinese",
    "common.switchToEn": "Switch to English",

    // Company info
    "company.name": "SHANDONG JIEFANG",
    "company.tagline": "Used Car Export",
    "company.shortName": "JF",
    "company.email": "shandongjiefang@163.com",
    "company.address": "Alibaba Cross-border Industrial Park, Dongping County, Tai'an City, Shandong Province, P.R. China",

    // CTA
    "cta.title": "Ready to Expand Your Inventory?",
    "cta.subtitle": "Browse our current special offers and find your next best-seller. Premium Chinese used cars at export prices — ready for global delivery.",
    "cta.button": "Explore Special Offers",

    // Footer
    "footer.tagline": "Your trusted partner in Chinese used car export. Premium vehicles, professional service, global delivery.",
    "footer.quickLinks": "Quick Links",
    "footer.contactInfo": "Contact Info",
    "footer.hours": "Business Hours",
    "footer.weekday": "Monday - Friday",
    "footer.time": "9:00 AM - 6:00 PM",
    "footer.timezone": "(China Standard Time, UTC+8)",
    "footer.reply": "We reply within 24 hours",
    "footer.company": "Shandong Jiefang Import & Export Co., Ltd.",
    "footer.rights": "All Rights Reserved.",

    // Cars page
    "cars.title": "Special Offers",
    "cars.subtitle": "Browse our current inventory of premium used cars available for export. All vehicles inspected and ready for international delivery.",
    "cars.allBrands": "All Brands",
    "cars.allYears": "All Years",
    "cars.sortNewest": "Newest First",
    "cars.sortPriceLow": "Price: Low to High",
    "cars.sortPriceHigh": "Price: High to Low",
    "cars.found": "vehicle(s) found",
    "cars.noResults": "No vehicles found",
    "cars.noResultsDesc": "Try adjusting your filters to see more results.",
    "cars.browseVehicles": "Browse Vehicles",
    "cars.available": "Available",
    "cars.exportPrice": "Export Price",

    // Car detail
    "car.breadcrumbHome": "Home",
    "car.breadcrumbCars": "Special Offers",
    "car.specifications": "Specifications",
    "car.condition": "Condition Report",
    "car.exportPrice": "Export Price",
    "car.fobNote": "FOB Price, Excluding Shipping",
    "car.brand": "Brand",
    "car.model": "Model",
    "car.year": "Year",
    "car.mileage": "Mileage",
    "car.transmission": "Transmission",
    "car.drivetrain": "Drivetrain",
    "car.fuelType": "Fuel Type",
    "car.color": "Color",

    // Inquiry
    "inquiry.title": "Inquire About This Vehicle",
    "inquiry.name": "Your Name",
    "inquiry.email": "Email Address",
    "inquiry.company": "Company (Optional)",
    "inquiry.message": "I am interested in the {{car}}. Please send me more details...",
    "inquiry.submit": "Send Inquiry",
    "inquiry.success": "Inquiry Sent!",
    "inquiry.successDesc": "We will get back to you within 24 hours.",

    // About
    "about.title": "About Us",
    "about.subtitle": "Your Trusted Partner in Chinese Used Car Export",
    "about.companyName": "Shandong Jiefang Import & Export Co., Ltd.",
    "about.intro1": "Based in Shandong Province, China — one of the country's largest automotive trading hubs — we specialize in sourcing, inspecting, and exporting high-quality used vehicles to international auto dealers worldwide.",
    "about.intro2": "With deep roots in China's automotive supply chain and a commitment to transparency, we bridge the gap between China's vast used car market and global buyers seeking reliable, competitively-priced vehicles.",
    "about.companyPhoto": "Company Photo",
    "about.processTitle": "Our Full-Service Export Process",
    "about.process1.title": "Vehicle Sourcing",
    "about.process1.desc": "We locate the best vehicles across China's wholesale markets, dealerships, and auctions based on your requirements.",
    "about.process2.title": "Inspection",
    "about.process2.desc": "Every vehicle undergoes a comprehensive multi-point inspection. We provide detailed reports and photos.",
    "about.process3.title": "Pricing & Payment",
    "about.process3.desc": "Transparent pricing with flexible payment terms. Secure your purchase with a deposit.",
    "about.process4.title": "Export Clearance",
    "about.process4.desc": "We handle all export documentation, customs clearance, and regulatory compliance.",
    "about.process5.title": "Global Shipping",
    "about.process5.desc": "Reliable international logistics partners ensure safe and timely delivery to your destination port.",
    "about.credentialsTitle": "Our Credentials",
    "about.cred1.title": "Business License",
    "about.cred1.desc": "Registered and licensed import/export enterprise in the People's Republic of China.",
    "about.cred2.title": "Used Car Export Qualification",
    "about.cred2.desc": "Officially licensed by China's Ministry of Commerce for used vehicle export operations.",
    "about.cred3.title": "Global Trade Partners",
    "about.cred3.desc": "Trusted by auto dealers across Africa, Middle East, Southeast Asia, and South America.",
    "about.trustTitle": "Building Trust Through Transparency",
    "about.trustDesc": "We believe that international vehicle trade thrives on trust. Every vehicle we export comes with complete documentation, honest condition reports, and our commitment to your satisfaction. When you partner with Shandong Jiefang, you gain a reliable, long-term sourcing partner in China.",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "Get in touch with our team for inquiries and partnerships",
    "contact.getInTouch": "Get In Touch",
    "contact.email": "Email",
    "contact.emailReply": "We reply within 24 hours",
    "contact.address": "Address",
    "contact.whatsapp": "WhatsApp",
    "contact.whatsappComing": "Coming soon",
    "contact.hours": "Business Hours",
    "contact.hoursValue": "Monday – Friday: 9:00 AM – 6:00 PM",
    "contact.hoursTz": "China Standard Time (UTC+8)",
    "contact.formTitle": "Send Us a Message",
    "contact.name": "Your Name *",
    "contact.namePlaceholder": "John Doe",
    "contact.emailLabel": "Email Address *",
    "contact.emailPlaceholder": "john@dealer.com",
    "contact.company": "Company",
    "contact.companyPlaceholder": "Your Dealership Name",
    "contact.subject": "Subject *",
    "contact.subjectPlaceholder": "How can we help you?",
    "contact.message": "Your Message *",
    "contact.messagePlaceholder": "Tell us about your requirements...",
    "contact.submit": "Send Message",
    "contact.successTitle": "Message Sent!",
    "contact.successDesc": "Thank you for reaching out. We will get back to you as soon as possible.",

    // History page
    "history.pageTitle": "Historical Price Reference",
    "history.pageSubtitle": "Classic models' export transaction prices from previous years — a data-driven guide for your purchasing decisions",
    "history.yearTitle": "Classic Model Export Prices",
    "history.yearDesc": "Historical transaction data compiled from China used car export records. Prices in USD (FOB).",
    "history.colModel": "Model",
    "history.colAvgPrice": "Average Export Price",
    "history.colRange": "Price Range (Low – High)",
    "history.colSpread": "Price Spread",
    "history.noteTitle": "Important Note",
    "history.noteDesc": "These prices are historical references based on aggregate export transaction data. Actual prices vary based on vehicle condition, mileage, market demand, and exchange rates. Contact us for current pricing on specific vehicles.",

    // Auth
    "auth.loginTitle": "Welcome Back",
    "auth.loginSubtitle": "Sign in to your dealer account",
    "auth.email": "Email Address",
    "auth.emailPlaceholder": "dealer@example.com",
    "auth.password": "Password",
    "auth.passwordPlaceholder": "••••••••",
    "auth.submitLogin": "Sign In",
    "auth.noAccount": "Don't have an account?",
    "auth.registerLink": "Register here",
    "auth.registerTitle": "Create Account",
    "auth.registerSubtitle": "Join as an international dealer partner",
    "auth.name": "Full Name *",
    "auth.namePlaceholder": "John Doe",
    "auth.company": "Company Name",
    "auth.companyPlaceholder": "Your Dealership Name",
    "auth.confirmPassword": "Confirm Password *",
    "auth.confirmPlaceholder": "Re-enter your password",
    "auth.passwordHint": "Min. 8 characters",
    "auth.submitRegister": "Create Account",
    "auth.hasAccount": "Already have an account?",
    "auth.loginLink": "Sign in here",

    // Dashboard
    "dashboard.title": "My Dashboard",
    "dashboard.subtitle": "Manage your favorites, inquiries, and account settings",
    "dashboard.saved": "Saved Vehicles",
    "dashboard.inquiries": "Inquiries Sent",
    "dashboard.accountType": "Account Type",
    "dashboard.free": "Free",
    "dashboard.favoritesTitle": "My Favorites",
    "dashboard.noFavorites": "No favorites yet. Browse our special offers and save vehicles you like!",
    "dashboard.inquiriesTitle": "My Inquiries",
    "dashboard.noInquiries": "No inquiries yet. Contact us about any vehicle you're interested in!",

    // Spec labels (for car detail page)
    "spec.engine": "Engine",
    "spec.transmission": "Transmission",
    "spec.drivetrain": "Drivetrain",
    "spec.fuelType": "Fuel Type",
    "spec.color": "Color",
    "spec.seats": "Seats",
    "spec.vin": "VIN",
  },
  zh: {
    // Nav
    "nav.home": "首页",
    "nav.cars": "特价车源",
    "nav.history": "价格参考",
    "nav.about": "关于我们",
    "nav.contact": "联系我们",
    "nav.login": "登录",
    "nav.register": "注册",
    "nav.dashboard": "会员中心",
    "nav.logout": "退出",
    "nav.langSwitch": "English",

    // Hero
    "hero.title": "限时特价车专区",
    "hero.subtitle": "精选优质二手车，出口价格一步到位",
    "hero.cta": "查看全部车源",
    "hero.badge": "限时特价车型",

    // Advantages
    "advantages.title": "为什么选择我们",
    "advantages.subtitle": "三大服务优势，成就您的采购信心",
    "advantages.sourcing.title": "优质车源保障",
    "advantages.sourcing.desc": "严格筛选中国汽车市场优质车源，每辆车入库前均经过多点位专业检测，确保车辆来源可靠，只将最优质的车辆呈现给国际客户。",
    "advantages.guarantee.title": "车况质量保证",
    "advantages.guarantee.desc": "提供专业检测报告，真实呈现车辆状况。我们提供详细照片、验证文件和90天回购保障，让您每次采购都充满信心。",
    "advantages.process.title": "灵活采购流程",
    "advantages.process.desc": "支付定金即可锁定心仪车辆，待车辆出口报关时再支付尾款——在整个交易过程中为您提供资金灵活性和采购保障。",

    // History
    "history.title": "经典车型历史成交价参考",
    "history.subtitle": "历年经典车型出口价格，为您的采购决策提供数据参考",
    "history.avgPrice": "平均出口价格",
    "history.priceRange": "价格区间",
    "history.viewDetails": "查看完整价格参考",

    // Common
    "common.km": "公里",
    "common.usd": "美元",
    "common.image": "图片",
    "common.images": "张图片",
    "common.privacy": "隐私政策",
    "common.terms": "服务条款",
    "common.toggleMenu": "切换菜单",
    "common.slide": "幻灯片",
    "common.switchToZh": "切换到中文",
    "common.switchToEn": "切换到英文",

    // Company info
    "company.name": "山东解放",
    "company.tagline": "二手车出口",
    "company.shortName": "JF",
    "company.email": "shandongjiefang@163.com",
    "company.address": "中国山东省泰安市东平县阿里巴巴跨境电商产业园",

    // CTA
    "cta.title": "准备好扩充您的库存了吗？",
    "cta.subtitle": "浏览当前特价车源，找到最适合您市场的畅销车型。优质中国二手车，出口价格，全球交付。",
    "cta.button": "探索特价车源",

    // Footer
    "footer.tagline": "您值得信赖的中国二手车出口合作伙伴。优质车源，专业服务，全球送达。",
    "footer.quickLinks": "快速链接",
    "footer.contactInfo": "联系方式",
    "footer.hours": "工作时间",
    "footer.weekday": "周一至周五",
    "footer.time": "上午 9:00 - 下午 6:00",
    "footer.timezone": "（中国标准时间，UTC+8）",
    "footer.reply": "我们会在24小时内回复",
    "footer.company": "山东解放进出口有限公司",
    "footer.rights": "版权所有。",

    // Cars page
    "cars.title": "特价车源",
    "cars.subtitle": "浏览我们当前可供出口的优质二手车库存。所有车辆均经过检测，随时准备国际交付。",
    "cars.allBrands": "全部品牌",
    "cars.allYears": "全部年份",
    "cars.sortNewest": "最新发布",
    "cars.sortPriceLow": "价格从低到高",
    "cars.sortPriceHigh": "价格从高到低",
    "cars.found": "辆",
    "cars.noResults": "未找到车辆",
    "cars.noResultsDesc": "请调整筛选条件查看更多结果。",
    "cars.browseVehicles": "浏览车辆",
    "cars.available": "可售",
    "cars.exportPrice": "出口价格",

    // Car detail
    "car.breadcrumbHome": "首页",
    "car.breadcrumbCars": "特价车源",
    "car.specifications": "车辆参数",
    "car.condition": "车况介绍",
    "car.exportPrice": "出口价格",
    "car.fobNote": "FOB 价格，不含运费",
    "car.brand": "品牌",
    "car.model": "车型",
    "car.year": "年份",
    "car.mileage": "里程",
    "car.transmission": "变速箱",
    "car.drivetrain": "驱动方式",
    "car.fuelType": "燃料类型",
    "car.color": "颜色",

    // Inquiry
    "inquiry.title": "咨询此车辆",
    "inquiry.name": "您的姓名",
    "inquiry.email": "电子邮箱",
    "inquiry.company": "公司名称（选填）",
    "inquiry.message": "我对 {{car}} 很感兴趣，请发送更多详细信息...",
    "inquiry.submit": "发送询盘",
    "inquiry.success": "询盘已发送！",
    "inquiry.successDesc": "我们会尽快与您联系。",

    // About
    "about.title": "关于我们",
    "about.subtitle": "您值得信赖的中国二手车出口合作伙伴",
    "about.companyName": "山东解放进出口有限公司",
    "about.intro1": "我们位于中国山东省——中国最大的汽车交易中心之一，专注于为全球汽车经销商提供优质二手车的采购、检测和出口服务。",
    "about.intro2": "凭借在中国汽车供应链中的深厚根基和对透明度的承诺，我们架起了中国庞大的二手车市场与寻求可靠、价格有竞争力车辆的全球买家之间的桥梁。",
    "about.companyPhoto": "公司照片",
    "about.processTitle": "一站式出口服务流程",
    "about.process1.title": "车辆寻源",
    "about.process1.desc": "根据您的需求，在中国各大批发市场、经销商和拍卖行中甄选最佳车源。",
    "about.process2.title": "专业检测",
    "about.process2.desc": "每辆车经过全面的多点位检测。我们提供详细的检测报告和照片。",
    "about.process3.title": "定价与支付",
    "about.process3.desc": "透明的定价机制，灵活的付款方式。支付定金即可锁定车辆。",
    "about.process4.title": "出口报关",
    "about.process4.desc": "我们处理所有出口单证、报关和监管合规事宜。",
    "about.process5.title": "全球物流",
    "about.process5.desc": "可靠的国际物流合作伙伴，确保车辆安全及时运达您的目的港。",
    "about.credentialsTitle": "企业资质",
    "about.cred1.title": "营业执照",
    "about.cred1.desc": "在中华人民共和国注册的合法进出口企业。",
    "about.cred2.title": "二手车出口资质",
    "about.cred2.desc": "经中国商务部正式许可的二手车出口经营资质。",
    "about.cred3.title": "全球贸易伙伴",
    "about.cred3.desc": "深受非洲、中东、东南亚和南美汽车经销商的信任。",
    "about.trustTitle": "以透明铸就信任",
    "about.trustDesc": "我们坚信国际贸易的繁荣源于信任。我们出口的每一辆车都附带完整的文件、诚实的车况报告以及我们对您满意度的承诺。当您与山东解放合作时，您获得的是一个可靠、长期的中国采购伙伴。",

    // Contact
    "contact.title": "联系我们",
    "contact.subtitle": "欢迎与我们联系，洽谈合作",
    "contact.getInTouch": "联系方式",
    "contact.email": "电子邮箱",
    "contact.emailReply": "我们会在24小时内回复",
    "contact.address": "公司地址",
    "contact.whatsapp": "WhatsApp",
    "contact.whatsappComing": "即将开通",
    "contact.hours": "工作时间",
    "contact.hoursValue": "周一至周五：上午 9:00 - 下午 6:00",
    "contact.hoursTz": "中国标准时间（UTC+8）",
    "contact.formTitle": "在线留言",
    "contact.name": "您的姓名 *",
    "contact.namePlaceholder": "张三",
    "contact.emailLabel": "电子邮箱 *",
    "contact.emailPlaceholder": "zhangsan@example.com",
    "contact.company": "公司名称",
    "contact.companyPlaceholder": "您的汽车经销公司名称",
    "contact.subject": "主题 *",
    "contact.subjectPlaceholder": "有什么可以帮您的？",
    "contact.message": "留言内容 *",
    "contact.messagePlaceholder": "请告诉我们您的需求...",
    "contact.submit": "发送留言",
    "contact.successTitle": "留言已发送！",
    "contact.successDesc": "感谢您的留言！我们会尽快回复您。",

    // History page
    "history.pageTitle": "历史成交价参考",
    "history.pageSubtitle": "历年经典车型出口交易价格——为您的采购决策提供数据驱动的参考",
    "history.yearTitle": "年经典车型出口价格",
    "history.yearDesc": "历史交易数据来源于中国二手车出口记录。价格为美元（FOB）。",
    "history.colModel": "车型",
    "history.colAvgPrice": "平均出口价格",
    "history.colRange": "价格区间（最低 – 最高）",
    "history.colSpread": "价差范围",
    "history.noteTitle": "重要提示",
    "history.noteDesc": "以上价格为基于历史出口交易数据的参考价格。实际价格会因车辆状况、里程数、市场需求和汇率波动而变化。请联系我们获取具体车辆的当前报价。",

    // Auth
    "auth.loginTitle": "欢迎回来",
    "auth.loginSubtitle": "登录您的经销商账户",
    "auth.email": "电子邮箱",
    "auth.emailPlaceholder": "dealer@example.com",
    "auth.password": "密码",
    "auth.passwordPlaceholder": "••••••••",
    "auth.submitLogin": "登录",
    "auth.noAccount": "还没有账号？",
    "auth.registerLink": "立即注册",
    "auth.registerTitle": "创建账号",
    "auth.registerSubtitle": "注册成为国际经销商合作伙伴",
    "auth.name": "姓名 *",
    "auth.namePlaceholder": "张三",
    "auth.company": "公司名称",
    "auth.companyPlaceholder": "您的汽车经销公司名称",
    "auth.confirmPassword": "确认密码 *",
    "auth.confirmPlaceholder": "请再次输入密码",
    "auth.passwordHint": "至少8个字符",
    "auth.submitRegister": "创建账号",
    "auth.hasAccount": "已有账号？",
    "auth.loginLink": "立即登录",

    // Dashboard
    "dashboard.title": "会员中心",
    "dashboard.subtitle": "管理您的收藏、询盘和账户设置",
    "dashboard.saved": "已收藏车辆",
    "dashboard.inquiries": "已发送询盘",
    "dashboard.accountType": "账户类型",
    "dashboard.free": "免费",
    "dashboard.favoritesTitle": "我的收藏",
    "dashboard.noFavorites": "暂无收藏。浏览特价车源，收藏您感兴趣的车辆！",
    "dashboard.inquiriesTitle": "询盘记录",
    "dashboard.noInquiries": "暂无询盘记录。对感兴趣的车辆发送询盘吧！",

    // Spec labels (for car detail page)
    "spec.engine": "发动机",
    "spec.transmission": "变速箱",
    "spec.drivetrain": "驱动方式",
    "spec.fuelType": "燃料类型",
    "spec.color": "颜色",
    "spec.seats": "座位数",
    "spec.vin": "车架号",
  },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, replacements?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
});

export function useLang() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && (saved === "en" || saved === "zh")) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (key: string, replacements?: Record<string, string>) => {
    let value = translations[lang]?.[key];
    if (value === undefined) {
      // Fallback to English
      value = translations.en[key];
    }
    if (value === undefined) return key;

    if (replacements) {
      for (const [k, v] of Object.entries(replacements)) {
        value = value!.replace(`{{${k}}}`, v);
      }
    }
    return value!;
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ lang: "en", setLang, t }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
