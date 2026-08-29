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

/** 可選規格（例如潤唇膏香味） */
export type ProductVariant = {
  id: string;
  label: string;
};

export type Product = {
  id: string;
  /** 商品名稱 */
  name: string;
  /** 港幣售價（數字，不含貨幣符號） */
  price: number;
  /** 原價（有優惠時顯示劃線價） */
  originalPrice?: number;
  /** 列表用短描述 */
  description: string;
  /** 詳情頁加長說明 */
  details?: string;
  /** 主要成分 */
  ingredients?: string;
  /** 使用方法 */
  usage?: string;
  /** 注意事項／禁忌 */
  warnings?: string;
  /** 類別 */
  category: ProductCategory;
  /** 圖片路徑（放在 public 底下；英文檔名避免 Stripe URL 編碼問題） */
  image: string;
  /** 可選規格；有值時加入購物車必須選擇 */
  variants?: ProductVariant[];
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
    details:
      "琥珀玻璃樽盛載的手作香味蠟燭，冰花蠟表面呈現細緻結晶紋理。點燃後緩慢釋放溫潤香氛，適合睡前閱讀、入浴後放鬆，或為客廳添上一抹安靜的光。",
    ingredients: "冰花蠟、天然香氛精油、棉芯、琥珀玻璃樽",
    usage: "首次點燃請待蠟面完全融化至邊緣（約 2–3 小時），之後每次點燃不超過 3 小時。熄滅後待蠟冷卻再蓋上蓋子。",
    warnings: "請放置於耐熱平面，遠離兒童、寵物及易燃物。請勿在無人看管時點燃。",
    category: "candles",
    image: "/images/products/香味蠟燭.jpg",
  },
  {
    id: "candle-sand-small",
    name: "小沙蠟蠟燭",
    price: 58,
    description:
      "獨特沙蠟質感，暖黃與青綠漸層。附精緻手作木插牌，既是香薰也是藝術擺設。",
    details:
      "沙蠟以細緻砂感層次堆疊，暖黃與青綠漸層如海岸退潮。附上手作木插牌，熄燈後仍是案頭的小型雕塑。",
    ingredients: "沙蠟、天然色粉、棉芯、玻璃容器、手作木插牌",
    usage: "首次點燃請待蠟面均勻融化。沙蠟層次較厚，建議每次點燃 1.5–2.5 小時。",
    warnings: "請放置於耐熱平面，遠離兒童、寵物及易燃物。請勿在無人看管時點燃。",
    category: "candles",
    image: "/images/products/小沙蠟蠟燭.jpg",
  },
  {
    id: "candle-sand-large",
    name: "大沙蠟蠟燭",
    price: 88,
    description:
      "方形寬口玻璃盛載的漸層沙蠟，容量加倍。優雅金邊標籤，點綴生活儀式感。",
    details:
      "方形寬口玻璃承載加倍容量的漸層沙蠟，燃燒時間更長。可作為空間主視覺，也能與小沙蠟組成子母擺設。",
    ingredients: "沙蠟、天然色粉、棉芯、方形寬口玻璃容器",
    usage: "首次點燃請待蠟面完全融化至邊緣。大容量建議每次點燃 2–3 小時，避免芯炭過長。",
    warnings: "請放置於耐熱平面，遠離兒童、寵物及易燃物。請勿在無人看管時點燃。",
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
    details:
      "小巧尺寸適合浴室或客用洗手位。茶樹清新、佛手柑明亮，洗後肌膚柔潤不緊繃。",
    ingredients: "植物油皂基、牛奶滋潤成分、茶樹精油、佛手柑精油",
    usage: "沾濕雙手後輕搓起泡，沖淨即可。亦可置於皂盤瀝乾，延長使用壽命。",
    warnings: "僅供外用。若出現紅腫過敏請停止使用。避免接觸眼睛。",
    category: "skincare",
    image: "/images/products/小洗手肥皂.jpg",
  },
  {
    id: "soap-large",
    name: "洗手肥皂 (大) - 茶樹+佛手柑",
    price: 38,
    description:
      "有機山脈造型手工皂，質感獨特。深層潔淨同時保持肌膚滋潤不緊繃。",
    details:
      "山脈造型大皂，質感與香氣同樣鮮明。適合家用洗手台日常使用，亦可作為禮物。",
    ingredients: "植物油皂基、牛奶滋潤成分、茶樹精油、佛手柑精油",
    usage: "沾濕雙手後輕搓起泡，沖淨即可。用後放於通風處瀝乾。",
    warnings: "僅供外用。若出現紅腫過敏請停止使用。避免接觸眼睛。",
    category: "skincare",
    image: "/images/products/大洗手肥皂.jpg",
  },
  {
    id: "lip-balm",
    name: "天然潤唇膏",
    price: 38,
    description:
      "精美山水彩繪管身。蘊含甜杏仁油、乳木果脂及天然蜂蠟，深層修護雙唇。可選玫瑰、白蘭花或茉莉花香味。",
    details:
      "以甜杏仁油、乳木果脂與天然蜂蠟製成，質地溫潤好推開。管身山水彩繪，三種花香可依心情或季節挑選。",
    ingredients: "甜杏仁油、乳木果脂、天然蜂蠟、天然花香精油",
    usage: "需要時薄塗於雙唇。睡前可稍厚塗作夜間修護。",
    warnings: "對蜂蠟或堅果油過敏者請慎用。若有不適請停止使用。",
    category: "skincare",
    image: "/images/products/天然潤唇膏.jpg",
    variants: [
      { id: "rose", label: "玫瑰" },
      { id: "michelia", label: "白蘭花" },
      { id: "jasmine", label: "茉莉花" },
    ],
  },

  // —— 商品 1：天然潤膚霜 30ml（新圖）
  {
    id: "hand-cream-30ml",
    name: "天然潤膚霜 (30ml 大樽裝)",
    price: 38,
    description:
      "琥珀金黃凝膠質地，極易吸收。深層滋潤乾燥肌膚，散發淡淡草本香氣。",
    details:
      "30ml 大樽適合放在梳妝台或床頭。琥珀金黃凝膠質地清爽好吸收，滋潤雙手與小面積乾燥肌。",
    ingredients: "植物油脂、天然保濕成分、草本精油",
    usage: "取適量於清潔後肌膚輕柔按摩至吸收。可重複塗抹。",
    warnings: "僅供外用。對成分過敏者請勿使用。避免接觸眼睛與黏膜。",
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
    details:
      "20ml 精巧裝可放進手袋或口袋，外出補水保濕剛剛好。質地溫和，四季皆宜。",
    ingredients: "植物油脂、天然保濕成分、草本精油",
    usage: "取適量於清潔後肌膚輕柔按摩至吸收。",
    warnings: "僅供外用。對成分過敏者請勿使用。避免接觸眼睛與黏膜。",
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
    details:
      "以天然精油調製的防蚊膏，質地清爽易推開。適合戶外小休、家居窗邊使用。不含 DEET。",
    ingredients: "天然植物油基底、防蚊草本精油配方",
    usage: "取少量均勻塗抹於外露皮膚。出汗或游泳後請重新塗抹。",
    warnings:
      "不含 DEET。4 歲以上適用。孕婦及 G6PD 缺乏症人士忌用。勿塗於傷口、眼睛及黏膜。若有過敏反應請立即停用。",
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
    details:
      "固態防蚊磚可掛於窗前、床頭或書桌旁，緩慢釋放草本香氣，為空間添上一層輕柔防護。",
    ingredients: "天然蠟質載體、防蚊草本精油",
    usage: "置於通風處或掛起使用。避免直接日曬以延長香氣。",
    warnings: "非食用。請放在兒童與寵物不易觸及處。孕婦及 G6PD 缺乏症人士請慎用。",
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
    originalPrice: 146,
    description: "精選沙蠟組合！比單買更划算 (原價$146，即慳$18)。",
    details:
      "小沙蠟與大沙蠟一次擁有，可分置不同空間，或並陳於茶几作為主視覺。比單買即慳 HK$18。",
    ingredients: "沙蠟、天然色粉、棉芯、玻璃容器（含手作木插牌）",
    usage: "請分別依照單品蠟燭說明點燃，首次均需待蠟面融化至邊緣。",
    warnings: "請放置於耐熱平面，遠離兒童、寵物及易燃物。請勿在無人看管時點燃。",
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
    originalPrice: 96,
    description: "雙倍暖意！琥珀樽香味蠟燭超值裝 (原價$96，即慳$18)。",
    details:
      "兩支琥珀樽香味蠟燭，可分贈或自用。比單買兩支即慳 HK$18。",
    ingredients: "冰花蠟、天然香氛精油、棉芯、琥珀玻璃樽 ×2",
    usage: "請依照單品香味蠟燭說明點燃與保養。",
    warnings: "請放置於耐熱平面，遠離兒童、寵物及易燃物。請勿在無人看管時點燃。",
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
    originalPrice: 66,
    description: "唇齒與肌膚的雙重全天然滋潤保護 (原價$66，即慳$16)。",
    details:
      "潤唇膏與 20ml 潤膚霜組合，照顧嘴唇與雙手。請選擇潤唇膏香味。比單買即慳 HK$16。",
    ingredients: "潤唇膏：甜杏仁油、乳木果脂、蜂蠟；潤膚霜：植物油脂、天然保濕成分",
    usage: "潤唇膏有需要時薄塗；潤膚霜取適量按摩至吸收。",
    warnings: "對蜂蠟、堅果油或護理成分過敏者請慎用。",
    category: "winter_sets",
    image: "/images/products/set-moist-lip-hand.jpg",
    variants: [
      { id: "rose", label: "玫瑰" },
      { id: "michelia", label: "白蘭花" },
      { id: "jasmine", label: "茉莉花" },
    ],
    imagePrompt:
      "A gentle product photo featuring a minimal bamboo/beige Lip Balm tube next to a 20ml Natural Moisturizing Cream jar. Displayed on a beige coarse linen towel with soft sunlight casting organic shadows. Minimalist skin care concept. " +
      KINTSUGI_VISUAL_STYLE,
  },
  // —— 商品 8
  {
    id: "set-hand-family",
    name: "【冬日滋潤套裝】大(30ml) + 小(20ml)潤膚霜 子母裝",
    price: 52,
    originalPrice: 66,
    description: "一樽放屋企，一樽隨身帶。全天候保濕 (原價$66，即慳$14)。",
    details:
      "30ml 放家、20ml 隨身，全天候補水保濕。比單買即慳 HK$14。",
    ingredients: "植物油脂、天然保濕成分、草本精油",
    usage: "取適量於清潔後肌膚輕柔按摩至吸收。",
    warnings: "僅供外用。對成分過敏者請勿使用。",
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
    originalPrice: 56,
    description: "隨身保濕超值分享裝 (原價$56，即慳$16)。",
    details:
      "兩支 20ml 潤膚霜，適合自用＋分享，或分放兩個手袋。比單買即慳 HK$16。",
    ingredients: "植物油脂、天然保濕成分、草本精油",
    usage: "取適量於清潔後肌膚輕柔按摩至吸收。",
    warnings: "僅供外用。對成分過敏者請勿使用。",
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
    originalPrice: 116,
    description: "香薰氛圍與天然滋潤的完美雙重享受 (原價$116，即慳$14)。",
    details:
      "大沙蠟營造空間氛圍，20ml 潤膚霜照顧雙手——儀式感與日常護理一次帶走。比單買即慳 HK$14。",
    ingredients: "沙蠟蠟燭材料；潤膚霜：植物油脂、天然保濕成分",
    usage: "蠟燭請依單品說明點燃；潤膚霜取適量按摩至吸收。",
    warnings: "蠟燭請遠離易燃物與兒童。護理產品僅供外用。",
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
    originalPrice: 56,
    description: "天然茶樹佛手柑牛奶皂，雙重溫和洗護 (原價$56，即慳$8)。",
    details:
      "兩件小洗手肥皂，適合浴室＋客用，或與親友分享。比單買即慳 HK$8。",
    ingredients: "植物油皂基、牛奶滋潤成分、茶樹精油、佛手柑精油",
    usage: "沾濕雙手後輕搓起泡，沖淨即可。",
    warnings: "僅供外用。若出現紅腫過敏請停止使用。",
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

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

/** 購物車列唯一鍵：有規格時為 productId__variantId */
export function getCartLineId(productId: string, variantId?: string): string {
  return variantId ? `${productId}__${variantId}` : productId;
}

export function parseCartLineId(lineId: string): {
  productId: string;
  variantId?: string;
} {
  const separator = lineId.indexOf("__");
  if (separator === -1) {
    return { productId: lineId };
  }
  return {
    productId: lineId.slice(0, separator),
    variantId: lineId.slice(separator + 2),
  };
}

export function getVariantLabel(
  product: Product,
  variantId?: string,
): string | undefined {
  if (!variantId || !product.variants?.length) return undefined;
  return product.variants.find((variant) => variant.id === variantId)?.label;
}

export function formatProductDisplayName(
  product: Product,
  variantId?: string,
): string {
  const label = getVariantLabel(product, variantId);
  return label ? `${product.name}（${label}）` : product.name;
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
