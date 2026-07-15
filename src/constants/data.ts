/**
 * Kintsugi Studio ｜ 繕物誌 — 網站真實資料總庫（市集價目牌）
 * 貨幣單位：港幣（HKD），價格為純數字；Stripe 後端會 ×100 轉為「分」。
 */

/* -------------------------------------------------------------------------- */
/* 型別定義                                                                    */
/* -------------------------------------------------------------------------- */

/** 商品分類：蠟燭／護膚／手作藝品／優惠套裝 */
export type ProductCategory = "candles" | "skincare" | "crafts" | "sets";

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

/* -------------------------------------------------------------------------- */
/* 商品資料 PRODUCTS                                                           */
/* -------------------------------------------------------------------------- */

export const PRODUCTS: Product[] = [
  // 一、特色蠟燭系列
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

  // 二、護膚與天然產品
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
  {
    id: "hand-cream-30ml",
    name: "天然潤膚霜 (30ml 大樽裝)",
    price: 38,
    description:
      "琥珀金黃凝膠質地，極易吸收。深層滋潤乾燥肌膚，散發淡淡草本香氣。",
    category: "skincare",
    image: "/images/products/潤膚霜.jpg",
  },
  {
    id: "hand-cream-20ml",
    name: "天然潤膚霜 (20ml 精緻裝)",
    price: 28,
    description: "隨身攜帶的深層保濕滋潤霜。全天然溫和成分，四季合用。",
    category: "skincare",
    image: "/images/products/潤膚霜.jpg",
  },

  // ⚠️ 以下為待更新圖片的產品（暫時使用 placeholder 確保部署順利）
  {
    id: "mosquito-balm",
    name: "天然防蚊膏",
    price: 28,
    description:
      "不含DEET，天然精油配方。4歲以上適用。(注意：孕婦及G6PD人士忌用) *相片即將更新*",
    category: "skincare",
    image: "/images/products/placeholder.jpg",
  },
  {
    id: "mosquito-brick",
    name: "天然防蚊磚",
    price: 18,
    description:
      "適合掛在窗前、床頭，持續散發溫和草本驅蚊香氣。 *相片即將更新*",
    category: "skincare",
    image: "/images/products/placeholder.jpg",
  },
  {
    id: "craft-xmas-tree",
    name: "聖誕樹 繞線畫",
    price: 238,
    description:
      "手工精製聖誕幾何繞線畫，節日送禮或點綴家居極佳。 *相片即將更新*",
    category: "crafts",
    image: "/images/products/placeholder.jpg",
  },
  {
    id: "craft-santa",
    name: "聖誕老人 繞線畫",
    price: 318,
    description:
      "細緻彩色線條交織出精緻的聖誕老人，滿滿的手作溫度。 *相片即將更新*",
    category: "crafts",
    image: "/images/products/placeholder.jpg",
  },

  // 三、超值優惠套裝（共用現有商品相片）
  {
    id: "set-candle-family",
    name: "【蠟燭愛好者套裝】小沙蠟 + 大沙蠟 子母裝",
    price: 128,
    description: "精選沙蠟組合！比單買更划算 (原價$146，即慳$18)。",
    category: "sets",
    image: "/images/products/大沙蠟蠟燭.jpg",
  },
  {
    id: "set-candle-double",
    name: "【蠟燭愛好者套裝】香味蠟燭 2個",
    price: 78,
    description: "雙倍暖意！琥珀樽香味蠟燭超值裝 (原價$96，即慳$18)。",
    category: "sets",
    image: "/images/products/香味蠟燭.jpg",
  },
  {
    id: "set-moist-lip-hand",
    name: "【冬日滋潤套裝】潤唇膏 + 20ml潤膚霜",
    price: 50,
    description: "唇齒與肌膚的雙重全天然滋潤保護 (原價$66，即慳$16)。",
    category: "sets",
    image: "/images/products/潤膚霜.jpg",
  },
  {
    id: "set-hand-family",
    name: "【冬日滋潤套裝】大(30ml) + 小(20ml)潤膚霜 子母裝",
    price: 52,
    description: "一樽放屋企，一樽隨身帶。全天候保濕 (原價$66，即慳$14)。",
    category: "sets",
    image: "/images/products/潤膚霜.jpg",
  },
  {
    id: "set-hand-double",
    name: "【冬日滋潤套裝】20ml潤膚霜 2支",
    price: 40,
    description: "隨身保濕超值分享裝 (原價$56，即慳$16)。",
    category: "sets",
    image: "/images/products/潤膚霜.jpg",
  },
  {
    id: "set-surprise-candle-hand",
    name: "【驚喜體驗套裝】大沙蠟蠟燭 + 20ml潤膚霜",
    price: 102,
    description: "香薰氛圍與天然滋潤的完美雙重享受 (原價$116，即慳$14)。",
    category: "sets",
    image: "/images/products/大沙蠟蠟燭.jpg",
  },
  {
    id: "set-soap-double",
    name: "【驚喜體驗套裝】洗手肥皂(小) 2件",
    price: 48,
    description: "天然茶樹佛手柑牛奶皂，雙重溫和洗護 (原價$56，即慳$8)。",
    category: "sets",
    image: "/images/products/小洗手肥皂.jpg",
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
  skincare: "護膚天然",
  crafts: "手作藝品",
  sets: "優惠套裝",
};
