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
  /** 圖片路徑（放在 public 底下） */
  image: string;
  /**
   * AI 生圖 Prompt（金繕美學）
   * 用於之後生成／替換商品圖；統一風格：溫暖奢華、日系金繕、石板／木質／亞麻背景、金箔與柔和光影
   */
  imagePrompt?: string;
};

export type Workshop = {
  id: string;
  /** 工作坊主題 */
  title: string;
  /** 港幣價格（數字） */
  price: number;
  /** 日期時間（全站統一使用 datetime） */
  datetime: string;
  /** 地點 */
  location: string;
  /** 剩餘名額 */
  spotsLeft: number;
  /** 課程描述 */
  description: string;
  /** 圖片路徑 */
  image: string;
};

/** 統一附加在 AI Prompt 尾端的金繕視覺標準 */
export const KINTSUGI_VISUAL_STYLE =
  "Warm luxurious Japanese Kintsugi aesthetic, natural stone/wood/linen background, gold leaf and golden line accents, soft artistic lighting.";

/* -------------------------------------------------------------------------- */
/* 商品資料 PRODUCTS                                                           */
/* -------------------------------------------------------------------------- */

export const PRODUCTS: Product[] = [
  // 一、特色蠟燭系列（單品）
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

  // 二、天然護理系列（含肥皂、潤唇膏與本次更新項目）
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

  // —— 商品 1
  {
    id: "hand-cream-30ml",
    name: "天然潤膚霜 (30ml 大樽裝)",
    price: 38,
    description:
      "琥珀金黃凝膠質地，極易吸收。深層滋潤乾燥肌膚，散發淡淡草本香氣。",
    category: "skincare",
    image: "/images/products/潤膚霜.jpg",
    imagePrompt:
      "A high-quality product photo of a 30ml Natural Moisturizing Cream in a large transparent glass jar with a wide mouth and a dark wood lid intricately decorated with gilded Kintsugi-style filigree. Placed on a textured stone slab with scattered gold powder, gold leaf flakes, and warm soft lighting. " +
      KINTSUGI_VISUAL_STYLE,
  },
  // —— 商品 2
  {
    id: "hand-cream-20ml",
    name: "天然潤膚霜 (20ml 精緻裝)",
    price: 28,
    description: "隨身攜帶的深層保濕滋潤霜。全天然溫和成分，四季合用。",
    category: "skincare",
    image: "/images/products/潤膚霜.jpg",
    imagePrompt:
      "A refined product photo of a 20ml Natural Moisturizing Cream in a slender glass jar with a gold metal lid featuring a fine Kintsugi filigree network pattern. Placed on a small ceramic dish with a miniature brush and gold leaf beside it. " +
      KINTSUGI_VISUAL_STYLE,
  },
  // —— 商品 3
  {
    id: "mosquito-balm",
    name: "天然防蚊膏",
    price: 28,
    description:
      "不含DEET，天然精油配方。4歲以上適用。(注意：孕婦及G6PD人士忌用)",
    category: "skincare",
    image: "/images/products/placeholder.jpg",
    imagePrompt:
      "A natural product photo of Mosquito Repellent Balm in a small round gilded metal tin with a golden-engraved Kintsugi herbal illustration on the lid. Placed on a woven linen cloth with sprigs of lemongrass and golden accents. " +
      KINTSUGI_VISUAL_STYLE,
  },
  // —— 商品 4
  {
    id: "mosquito-brick",
    name: "天然防蚊磚",
    price: 18,
    description: "適合掛在窗前、床頭，持續散發溫和草本驅蚊香氣。",
    category: "skincare",
    image: "/images/products/placeholder.jpg",
    imagePrompt:
      "An artistic product photo of a solid natural beige Mosquito Repellent Bar with Kintsugi network patterns. Partially wrapped in textured linen cloth bound with delicate golden wire, placed in an artistic stone basin with gold flakes. " +
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
    image: "/images/products/大沙蠟蠟燭.jpg",
    imagePrompt:
      "A luxury product catalog photo featuring a Small Sand Wax and Large Sand Wax candle jar side-by-side in a mother-and-child arrangement. Clear glass jars showing layered sand wax with embedded gold leaf and Kintsugi patterns, dark wood lids, placed on a polished wood surface. " +
      KINTSUGI_VISUAL_STYLE,
  },
  // —— 商品 6
  {
    id: "set-candle-double",
    name: "【蠟燭愛好者套裝】香味蠟燭 2個",
    price: 78,
    description: "雙倍暖意！琥珀樽香味蠟燭超值裝 (原價$96，即慳$18)。",
    category: "candle_sets",
    image: "/images/products/香味蠟燭.jpg",
    imagePrompt:
      "An elegant product catalog photo of 2 different scented candles in glass jars with unique Kintsugi line patterns engraved in gold. One candle is lit with a soft warm flame, placed on a stone slab with dried flowers and Kintsugi pottery details. " +
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
    image: "/images/products/潤膚霜.jpg",
    imagePrompt:
      "A curated product photo featuring a slim gilded Lip Balm tube with Kintsugi patterns alongside a 20ml Natural Moisturizing Cream jar. Presented together on an artistic ceramic dish with gold leaf flakes and a miniature brush. " +
      KINTSUGI_VISUAL_STYLE,
  },
  // —— 商品 8
  {
    id: "set-hand-family",
    name: "【冬日滋潤套裝】大(30ml) + 小(20ml)潤膚霜 子母裝",
    price: 52,
    description: "一樽放屋企，一樽隨身帶。全天候保濕 (原價$66，即慳$14)。",
    category: "winter_sets",
    image: "/images/products/潤膚霜.jpg",
    imagePrompt:
      "A luxurious product photo of a 30ml large cream jar and a 20ml small cream jar side-by-side in a mother-and-child arrangement. Both featuring Kintsugi metal/wood lids, set on a polished wood table with a Kintsugi-repaired ceramic bowl and gold leaf stack. " +
      KINTSUGI_VISUAL_STYLE,
  },
  // —— 商品 9
  {
    id: "set-hand-double",
    name: "【冬日滋潤套裝】20ml潤膚霜 2支",
    price: 40,
    description: "隨身保濕超值分享裝 (原價$56，即慳$16)。",
    category: "winter_sets",
    image: "/images/products/潤膚霜.jpg",
    imagePrompt:
      "An elegant product photo of two identical 20ml Natural Moisturizing Cream jars with gold metal Kintsugi lids. One open displaying the rich cream texture, set on a stone slab with gold leaf flakes. " +
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
    image: "/images/products/大沙蠟蠟燭.jpg",
    imagePrompt:
      "A luxurious set photo featuring a lit Large Sand Wax Candle jar and a 20ml Natural Moisturizing Cream bottle with gold Kintsugi details. Glowing warmly on a polished wood table with gold powder and gold leaf accents. " +
      KINTSUGI_VISUAL_STYLE,
  },
  // —— 商品 11
  {
    id: "set-soap-double",
    name: "【驚喜體驗套裝】洗手肥皂(小) 2件",
    price: 48,
    description: "天然茶樹佛手柑牛奶皂，雙重溫和洗護 (原價$56，即慳$8)。",
    category: "surprise_sets",
    image: "/images/products/小洗手肥皂.jpg",
    imagePrompt:
      "An artistic product photo of 2 small natural hand soap bars shaped with Kintsugi network patterns. Bound in linen cloth with golden wire, set inside an artistic stone basin with gold flakes and a lacquer brush. " +
      KINTSUGI_VISUAL_STYLE,
  },
];

/* -------------------------------------------------------------------------- */
/* 工作坊資料 WORKSHOPS                                                        */
/* -------------------------------------------------------------------------- */

export const WORKSHOPS: Workshop[] = [
  {
    id: "ws-kintsugi-exp",
    title: "基礎金繕修復體驗班",
    price: 680,
    datetime: "逢星期六 14:00 - 16:00",
    location: "Kintsugi Studio 本部",
    spotsLeft: 5,
    description:
      "體驗傳統金繕工藝，親手將破碎瓷器轉化為生命獨特的光芒。",
    image: "/images/workshops/kintsugi.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/* 輔助函式                                                                    */
/* -------------------------------------------------------------------------- */

/** 統一港幣顯示，例如 48 → HK$ 48 */
export function formatHkd(price: number): string {
  return `HK$ ${price.toLocaleString("en-HK")}`;
}

/** 首頁精選：取前 3 件商品 */
export function getFeaturedProducts(count = 3): Product[] {
  return PRODUCTS.slice(0, count);
}

/** 首頁最新工作坊：依陣列順序取前 N 筆 */
export function getLatestWorkshops(count = 2): Workshop[] {
  return WORKSHOPS.slice(0, count);
}

/** 商品分類標籤（繁中） */
export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  candles: "特色蠟燭",
  skincare: "天然護理系列",
  candle_sets: "蠟燭愛好者套裝",
  winter_sets: "冬日滋潤套裝",
  surprise_sets: "驚喜體驗套裝",
};
