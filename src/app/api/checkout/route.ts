import Stripe from "stripe";
import { NextResponse } from "next/server";
import { PRODUCTS } from "@/constants/data";

/* -------------------------------------------------------------------------- */
/* Stripe Checkout Session API                                                 */
/* POST /api/checkout                                                          */
/* 安全原則：價格以伺服器端 PRODUCTS 為準，不信任前端傳來的 price               */
/* -------------------------------------------------------------------------- */

/** 請求 body 中的購物車項目（前端只傳 id + quantity） */
type CheckoutRequestItem = {
  id: string;
  quantity: number;
  /** 以下欄位僅供顯示／除錯，實際金額以後端資料庫為準 */
  name?: string;
  price?: number;
};

type CheckoutRequestBody = {
  items: CheckoutRequestItem[];
  /** 可選：預填 Stripe 結帳頁的顧客電郵 */
  customerEmail?: string;
};

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("缺少環境變數 STRIPE_SECRET_KEY");
  }
  // API version 使用帳號預設；避免硬編碼過期版本
  return new Stripe(secretKey);
}

export async function POST(request: Request) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.error("[checkout] 缺少 NEXT_PUBLIC_BASE_URL");
      return NextResponse.json(
        { error: "伺服器尚未設定 NEXT_PUBLIC_BASE_URL" },
        { status: 500 },
      );
    }

    const body = (await request.json()) as CheckoutRequestBody;
    const items = body.items;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "購物車是空的，無法建立結帳會話" },
        { status: 400 },
      );
    }

    // 依伺服器端商品目錄組裝 line_items（防篡改價格）
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const item of items) {
      if (!item?.id || !Number.isFinite(item.quantity) || item.quantity < 1) {
        return NextResponse.json(
          { error: "購物車項目格式不正確" },
          { status: 400 },
        );
      }

      const product = PRODUCTS.find((p) => p.id === item.id);
      if (!product) {
        return NextResponse.json(
          { error: `找不到商品：${item.id}` },
          { status: 400 },
        );
      }

      const quantity = Math.min(Math.floor(item.quantity), 99);

      // Stripe 以「最小貨幣單位」計價：HKD 的 1 元 = 100 分
      // 例如 HK$10 → unit_amount: 1000
      // 商品圖須為公開可存取的 https URL；本機 localhost 圖請省略，避免 Session 失敗
      const absoluteImage = product.image.startsWith("http")
        ? product.image
        : `${baseUrl.replace(/\/$/, "")}${product.image}`;
      const canUseImage =
        absoluteImage.startsWith("https://") &&
        !absoluteImage.includes("localhost");

      line_items.push({
        quantity,
        price_data: {
          currency: "hkd",
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.name,
            description: product.description.slice(0, 500),
            ...(canUseImage ? { images: [absoluteImage] } : {}),
          },
        },
      });
    }

    const stripe = getStripe();

    // 建立 Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // 信用卡 + 支付寶（含 AlipayHK，視 Stripe 帳號地區／設定而定）
      payment_method_types: ["card", "alipay"],
      line_items,
      success_url: `${baseUrl.replace(/\/$/, "")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl.replace(/\/$/, "")}/checkout`,
      locale: "zh-HK",
      ...(body.customerEmail
        ? { customer_email: body.customerEmail }
        : {}),
      metadata: {
        source: "kintsugi-studio-web",
      },
    });

    if (!session.url) {
      console.error("[checkout] Session 建立成功但缺少 url", session.id);
      return NextResponse.json(
        { error: "無法取得 Stripe 付款連結" },
        { status: 500 },
      );
    }

    // 回傳 sessionId 與 url，前端可擇一導向
    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("[checkout] 建立 Session 失敗:", error);
    const message =
      error instanceof Error ? error.message : "建立結帳會話時發生錯誤";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
