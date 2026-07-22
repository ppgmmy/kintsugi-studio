/**
 * Kintsugi Studio ｜ 繕物誌 — 網站真實資料總庫（市集價目牌）
 * 貨幣單位：港幣（HKD），價格為純數字；Stripe 後端會 ×100 轉為「分」。
 */

/* -------------------------------------------------------------------------- */
/* 型別定義                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * 商品分類
 * - candles：單品蠟燭
 * - skincare：天然護理系列
 * - candle_sets / winter_sets / surprise_sets：各類優惠套裝
 */
export type ProductCategory =
  | "candles"
  | "skincare"
  | "candle_sets"
  | "winter_sets"
  | "surprise_sets";

export type Product = {
  id: string;
  /** 商品名稱 */
  name: string;
  /** 港幣價格（數字，不含貨幣符號） */
  price: number;
  /** 詳細描述 */
  description: string;
  /** 類別 */
  category: ProductCategory;
  /** 圖片路徑（放在 public 底下；英文檔名避免 Stripe URL 編碼問題） */
  image: string;
  /**
   * AI 生圖 Prompt
   * 日系自然極簡／侘寂：純白米杏、淡木、亞麻、晨光；無黑金奢華、無文字
   */
  imagePrompt?: string;
};

export type Workshop = {
  id: string;
  title: string;
  /** 目前售價／早鳥價（港幣） */
  price: number;
  /** 原價（若有早鳥優惠則填寫） */
  originalPrice?: number;
  /** 早鳥說明，例如「25/7前」 */
  earlyBirdLabel?: string;
  datetime: string;
  location: string;
  spotsLeft: number;
  description: string;
  image: string;
};

/** 統一附加在 AI Prompt 尾端的侘寂視覺標準 */
export const KINTSUGI_VISUAL_STYLE =
  "Japanese wabi-sabi natural minimalist aesthetic: pure white, beige, light wood, earthy tones, soft morning daylight, linen and handmade ceramics. No black-gold luxury, no readable text, no logos.";

/* -------------------------------------------------------------------------- */
/* 商品資料 PRODUCTS                                                           */
/* -------------------------------------------------------------------------- */

export const PRODUCTS: Product[] = [
  // 一、特色蠟燭系列（單品，沿用既有圖）
  {
    id: "candle-flavor",
    name: "香味蠟燭 (琥珀樽裝)",
    price: 48,
    description:
      "採用冰花蠟與天然香氛，溫暖的琥珀玻璃樽，營造極致舒適的療癒氛圍。",
    category: "candles",
    image: "/images/products/香味蠟燭.jpg",
  },
  {
    id: "candle-sand-small",
    name: "小沙蠟蠟燭",
    price: 58,
    description:
      "獨特沙蠟質感，暖黃與青綠漸層。附精緻手作木插牌，既是香薰也是藝術擺設。",
    category: "candles",
    image: "/images/products/小沙蠟蠟燭.jpg",
  },
  {
    id: "candle-sand-large",
    name: "大沙蠟蠟燭",
    price: 88,
    description:
      "方形寬口玻璃盛載的漸層沙蠟，容量加倍。優雅金邊標籤，點綴生活儀式感。",
    category: "candles",
    image: "/images/products/大沙蠟蠟燭.jpg",
  },

  // 二、天然護理系列
  {
    id: "soap-small",
    name: "洗手肥皂 (小) - 茶樹+佛手柑",
    price: 28,
    description:
      "溫和牛奶滋潤配方，泡沫綿密細緻。伴隨清新茶樹與佛手柑香氣。",
    category: "skincare",
    image: "/images/products/小洗手肥皂.jpg",
  },
  {
    id: "soap-large",
    name: "洗手肥皂 (大) - 茶樹+佛手柑",
    price: 38,
    description:
      "有機山脈造型手工皂，質感獨特。深層潔淨同時保持肌膚滋潤不緊繃。",
    category: "skincare",
    image: "/images/products/大洗手肥皂.jpg",
  },
  {
    id: "lip-balm",
    name: "天然潤唇膏 (玫瑰/白蘭花/茉莉花)",
    price: 38,
    description:
      "精美山水彩繪管身。蘊含甜杏仁油、乳木果脂及天然蜂蠟，深層修護雙唇。",
    category: "skincare",
    image: "/images/products/天然潤唇膏.jpg",
  },

  // —— 商品 1：天然潤膚霜 30ml（新圖）
  {
    id: "hand-cream-30ml",
    name: "天然潤膚霜 (30ml 大樽裝)",
    price: 38,
    description:
      "琥珀金黃凝膠質地，極易吸收。深層滋潤乾燥肌膚，散發淡淡草本香氣。",
    category: "skincare",
    image: "/images/products/cream-30ml.jpg",
    imagePrompt:
      "A clean, natural product photograph of a 30ml Natural Moisturizing Cream in a transparent glass jar with a light oak wood lid. Placed on a light beige textured linen cloth with soft natural morning sunlight, shadow of dried botanical herbs in the background. Minimalist Japanese organic lifestyle aesthetic. " +
      KINTSUGI_VISUAL_STYLE,
  },
  // —— 商品 2：天然潤膚霜 20ml（新圖）
  {
    id: "hand-cream-20ml",
    name: "天然潤膚霜 (20ml 精緻裝)",
    price: 28,
    description: "隨身攜帶的深層保濕滋潤霜。全天然溫和成分，四季合用。",
    category: "skincare",
    image: "/images/products/cream-20ml.jpg",
    imagePrompt:
      "A delicate product photograph of a small 20ml Natural Moisturizing Cream in a slender clear glass jar with a light bamboo cap. Resting on a matte off-white handcrafted ceramic dish alongside a small sprig of dried lavender. Warm, natural, clean daylight. " +
      KINTSUGI_VISUAL_STYLE,
  },
  // —— 商品 3：天然防蚊膏（新圖）
  {
    id: "mosquito-balm",
    name: "天然防蚊膏",
    price: 28,
    description:
      "不含DEET，天然精油配方。4歲以上適用。(注意：孕婦及G6PD人士忌用)",
    category: "skincare",
    image: "/images/products/mosquito-balm.jpg",
    imagePrompt:
      "A natural product photo of Mosquito Repellent Balm in a minimal round champagne-silver aluminum tin with a minimalist botanical line illustration label. Placed on a light raw wood table surrounded by fresh green lemongrass leaves. Bright, airy, and fresh. " +
      KINTSUGI_VISUAL_STYLE,
  },
  // —— 商品 4：天然防蚊磚（新圖）
  {
    id: "mosquito-brick",
    name: "天然防蚊磚",
    price: 18,
    description: "適合掛在窗前、床頭，持續散發溫和草本驅蚊香氣。",
    category: "skincare",
    image: "/images/products/mosquito-brick.jpg",
    imagePrompt:
      "An earthy product photograph of a solid cream-beige Natural Mosquito Repellent Bar. Partially wrapped in unbleached linen paper tied with natural jute twine. Set on a smooth light-gray river stone slab with soft morning window light. " +
      KINTSUGI_VISUAL_STYLE,
  },

  // 三、蠟燭愛好者套裝
  // —— 商品 5
  {
    id: "set-candle-family",
    name: "【蠟燭愛好者套裝】小沙蠟 + 大沙蠟 子母裝",
    price: 128,
    description: "精選沙蠟組合！比單買更划算 (原價$146，即慳$18)。",
    category: "candle_sets",
    image: "/images/products/set-candle-family.jpg",
    imagePrompt:
      "A cozy natural product catalog photo featuring a Small Sand Wax and Large Sand Wax candle jar side-by-side. Clear glass jars revealing subtle natural sand layers, fitted with light wood lids, placed on a light oak coffee table under warm ambient sunlight. " +
      KINTSUGI_VISUAL_STYLE,
  },
  // —— 商品 6
  {
    id: "set-candle-double",
    name: "【蠟燭愛好者套裝】香味蠟燭 2個",
    price: 78,
    description: "雙倍暖意！琥珀樽香味蠟燭超值裝 (原價$96，即慳$18)。",
    category: "candle_sets",
    image: "/images/products/set-candle-double.jpg",
    imagePrompt:
      "An aesthetic catalog photo of 2 scented soy candles in clear glass with minimal beige labels without readable text. One candle is lit with a soft warm flame. Set against a light cream plaster wall with dried eucalyptus branches nearby. Warm and relaxing atmosphere. " +
      KINTSUGI_VISUAL_STYLE,
  },

  // 四、冬日滋潤套裝
  // —— 商品 7
  {
    id: "set-moist-lip-hand",
    name: "【冬日滋潤套裝】潤唇膏 + 20ml潤膚霜",
    price: 50,
    description: "唇齒與肌膚的雙重全天然滋潤保護 (原價$66，即慳$16)。",
    category: "winter_sets",
    image: "/images/products/set-moist-lip-hand.jpg",
    imagePrompt:
      "A gentle product photo featuring a minimal bamboo/beige Lip Balm tube next to a 20ml Natural Moisturizing Cream jar. Displayed on a beige coarse linen towel with soft sunlight casting organic shadows. Minimalist skin care concept. " +
      KINTSUGI_VISUAL_STYLE,
  },
  // —— 商品 8
  {
    id: "set-hand-family",
    name: "【冬日滋潤套裝】大(30ml) + 小(20ml)潤膚霜 子母裝",
    price: 52,
    description: "一樽放屋企，一樽隨身帶。全天候保濕 (原價$66，即慳$14)。",
    category: "winter_sets",
    image: "/images/products/set-hand-family.jpg",
    imagePrompt:
      "A natural catalog photo showing a 30ml large cream jar and a 20ml small cream jar together. Light wood caps and clean paper labels without readable text, sitting on a light wooden tray with an organic earthy aesthetic. " +
      KINTSUGI_VISUAL_STYLE,
  },
  // —— 商品 9
  {
    id: "set-hand-double",
    name: "【冬日滋潤套裝】20ml潤膚霜 2支",
    price: 40,
    description: "隨身保濕超值分享裝 (原價$56，即慳$16)。",
    category: "winter_sets",
    image: "/images/products/set-hand-double.jpg",
    imagePrompt:
      "A clean product photo of two 20ml Natural Moisturizing Cream glass jars with light wooden caps. One jar open showing rich white cream texture, set on a light beige stone surface under soft diffused daylight. " +
      KINTSUGI_VISUAL_STYLE,
  },

  // 五、驚喜體驗套裝
  // —— 商品 10
  {
    id: "set-surprise-candle-hand",
    name: "【驚喜體驗套裝】大沙蠟蠟燭 + 20ml潤膚霜",
    price: 102,
    description: "香薰氛圍與天然滋潤的完美雙重享受 (原價$116，即慳$14)。",
    category: "surprise_sets",
    image: "/images/products/set-surprise-candle-hand.jpg",
    imagePrompt:
      "A warm lifestyle product photo featuring a lit Large Sand Wax Candle in clear glass and a 20ml Natural Moisturizing Cream jar with light wood lid. Placed on a cozy wooden desk next to an off-white ceramic mug under soft evening light. " +
      KINTSUGI_VISUAL_STYLE,
  },
  // —— 商品 11
  {
    id: "set-soap-double",
    name: "【驚喜體驗套裝】洗手肥皂(小) 2件",
    price: 48,
    description: "天然茶樹佛手柑牛奶皂，雙重溫和洗護 (原價$56，即慳$8)。",
    category: "surprise_sets",
    image: "/images/products/set-soap-double.jpg",
    imagePrompt:
      "A handcrafted product photo of 2 small natural oatmeal-beige soap bars. Wrapped neatly in parchment paper with hemp string. Displayed in an unglazed clay soap dish on a light marble or travertine slab. Pure, organic, and clean. " +
      KINTSUGI_VISUAL_STYLE,
  },
];

/* -------------------------------------------------------------------------- */
/* 工作坊資料 WORKSHOPS                                                        */
/* -------------------------------------------------------------------------- */

export const WORKSHOPS: Workshop[] = [
  {
    id: "ws-moon-mirror",
    title: "藝境月圓・月亮鏡工作坊",
    price: 200,
    originalPrice: 280,
    earlyBirdLabel: "25/7前",
    datetime: "逢星期一至六 12:00 - 17:00",
    location: "荃灣 COOLISTIC Space 共享空間",
    spotsLeft: 3,
    description:
      "親手創作屬於你的月亮藝術鏡，體驗繕物藝術之美。在手工藝中，練就接納與轉化。即日起至 7月 25日前報名，即享早鳥優惠！",
    image: "/images/workshops/moon-mirror-workshop.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/* 輔助函式                                                                    */
/* -------------------------------------------------------------------------- */

export function formatHkd(price: number): string {
  return `HK$ ${price.toLocaleString("en-HK")}`;
}

export function getFeaturedProducts(count = 3): Product[] {
  return PRODUCTS.slice(0, count);
}

export function getLatestWorkshops(count = 2): Workshop[] {
  return WORKSHOPS.slice(0, count);
}

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  candles: "特色蠟燭",
  skincare: "天然護理系列",
  candle_sets: "蠟燭愛好者套裝",
  winter_sets: "冬日滋潤套裝",
  surprise_sets: "驚喜體驗套裝",
};
