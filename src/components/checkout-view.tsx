"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { formatHkd } from "@/constants/data";
import { useCart } from "@/context/CartContext";

/* -------------------------------------------------------------------------- */
/* 結帳頁主體：訂單摘要 + 導向 Stripe Checkout                                  */
/* -------------------------------------------------------------------------- */

export function CheckoutView() {
  const {
    items,
    totalAmount,
    totalQuantity,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const [email, setEmail] = useState("");
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 點擊「確認付款」：
   * 1. POST /api/checkout 建立 Stripe Session
   * 2. 以 session.url 導向 Stripe 託管的安全付款頁
   */
  async function handlePay(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (items.length === 0 || paying) return;

    setPaying(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // 傳送 id / name / price / quantity（後端仍會以 PRODUCTS 覆寫價格）
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          customerEmail: email.trim() || undefined,
        }),
      });

      const data = (await response.json()) as {
        url?: string;
        sessionId?: string;
        error?: string;
      };

      if (!response.ok || !data.url) {
        throw new Error(data.error || "無法建立付款會話，請稍後再試");
      }

      // 現代做法：直接導向 Checkout Session URL
      // （等同於舊版 redirectToCheckout，且不需在前端載入 publishable key）
      window.location.href = data.url;
    } catch (err) {
      console.error("[checkout] 導向 Stripe 失敗:", err);
      setError(err instanceof Error ? err.message : "付款啟動失敗");
      setPaying(false);
    }
  }

  return (
    <div className="wabi-atmosphere relative flex min-h-full flex-col">
      <SiteHeader active="checkout" />

      <main className="relative z-10 flex-1">
        <section className="border-b border-line/40">
          <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
            <p className="text-xs tracking-[0.3em] text-gold">Checkout</p>
            <h1 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
              結帳
            </h1>
            <p className="mt-3 text-sm text-muted">
              以港幣（HKD）結算，付款由 Stripe 安全處理
            </p>
            <div className="gold-hairline mt-6 w-14" />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
          {items.length === 0 ? (
            <div className="mx-auto max-w-md py-16 text-center">
              <p className="font-serif text-xl text-foreground">購物車是空的</p>
              <p className="mt-3 text-sm leading-7 text-muted">
                先到常規商品挑選一件帶溫度的手作吧。
              </p>
              <Link
                href="/products"
                className="mt-8 inline-flex border border-gold bg-gold px-8 py-3 text-sm tracking-[0.18em] text-surface transition-colors hover:bg-gold-deep"
              >
                瀏覽商品
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              {/* -------- 左側：購物車清單 -------- */}
              <div>
                <h2 className="font-serif text-xl text-foreground">訂單摘要</h2>
                <p className="mt-2 text-sm text-muted">
                  共 {totalQuantity} 件商品
                </p>

                <ul className="mt-8 space-y-6">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-4 border-b border-line/70 pb-6"
                    >
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-surface-soft sm:h-28 sm:w-24">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-serif text-base text-foreground sm:text-lg">
                            {item.name}
                          </h3>
                          <p className="shrink-0 text-sm text-gold">
                            {formatHkd(item.price * item.quantity)}
                          </p>
                        </div>
                        <p className="mt-1 text-xs text-muted">
                          單價 {formatHkd(item.price)}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-line">
                            <button
                              type="button"
                              className="px-3 py-1.5 text-sm text-muted transition-colors hover:text-foreground"
                              aria-label="減少數量"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              −
                            </button>
                            <span className="min-w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="px-3 py-1.5 text-sm text-muted transition-colors hover:text-foreground"
                              aria-label="增加數量"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs tracking-wide text-muted underline-offset-2 transition-colors hover:text-foreground hover:underline"
                          >
                            移出購物車
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-end justify-between border-t border-line pt-6">
                  <span className="text-sm tracking-wide text-muted">總計</span>
                  <p className="font-serif text-2xl text-foreground">
                    總計：{formatHkd(totalAmount)}
                  </p>
                </div>
              </div>

              {/* -------- 右側：導向 Stripe -------- */}
              <div className="border border-line bg-surface/60 px-6 py-8 md:px-8 md:py-10">
                <h2 className="font-serif text-xl text-foreground">安全付款</h2>
                <p className="mt-2 text-sm leading-7 text-muted">
                  點擊確認後，將前往 Stripe
                  官方結帳頁完成付款。支援信用卡與支付寶（Alipay／AlipayHK）。
                </p>

                {/* 可接受的付款方式提示 */}
                <ul className="mt-6 flex flex-wrap gap-2">
                  {["Visa", "Mastercard", "AMEX", "AlipayHK"].map((label) => (
                    <li
                      key={label}
                      className="border border-line bg-background px-2.5 py-1 text-[11px] tracking-wide text-muted"
                    >
                      {label}
                    </li>
                  ))}
                </ul>

                <form className="mt-8 space-y-6" onSubmit={handlePay}>
                  <div>
                    <label
                      htmlFor="checkout-email"
                      className="mb-2 block text-xs tracking-[0.12em] text-muted"
                    >
                      電郵（選填，用於收據）
                    </label>
                    <input
                      id="checkout-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-line bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>

                  {error && (
                    <p
                      className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={paying || items.length === 0}
                    className="w-full border border-gold bg-gold py-4 text-sm tracking-[0.2em] text-surface transition-colors hover:bg-gold-deep disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {paying
                      ? "正在前往 Stripe…"
                      : `確認付款 (${formatHkd(totalAmount)})`}
                  </button>

                  <p className="text-center text-[11px] leading-5 text-muted">
                    付款頁面由 Stripe 加密處理，本站不會儲存您的卡號。
                  </p>
                </form>
              </div>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
