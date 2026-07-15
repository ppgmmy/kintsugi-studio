"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { useCart } from "@/context/CartContext";

/**
 * 付款成功頁（Client）
 * - 進入時自動清空 CartContext
 * - 顯示 Stripe session_id（若有）
 */
export function CheckoutSuccessView() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const clearedRef = useRef(false);

  useEffect(() => {
    if (clearedRef.current) return;
    clearedRef.current = true;
    clearCart();
  }, [clearCart]);

  return (
    <div className="wabi-atmosphere relative flex min-h-full flex-col">
      <SiteHeader active="checkout" />

      <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-20 md:px-10 md:py-28">
        <div className="w-full max-w-lg border border-line bg-surface/70 px-8 py-14 text-center md:px-12 md:py-16">
          {/* 成功圖示：金繕風格圓環 + 剔號 */}
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold-soft/50"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-8 w-8 text-gold-deep"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          <p className="mt-8 text-xs tracking-[0.3em] text-gold">
            Payment Complete
          </p>
          <h1 className="mt-4 font-serif text-3xl leading-relaxed text-foreground md:text-4xl">
            付款成功！感謝您的支持
          </h1>
          <div className="gold-hairline mx-auto mt-8 w-16" />

          <p className="mt-8 text-[15px] leading-8 text-muted md:text-base md:leading-9">
            我們已收到您的訂單，手作產品需要時間準備，稍後會透過電郵與您確認出貨詳情。
          </p>

          {sessionId && (
            <p className="mt-6 break-all text-[11px] tracking-wide text-muted/80">
              訂單參照：{sessionId}
            </p>
          )}

          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center border border-gold bg-gold px-8 py-3.5 text-sm tracking-[0.18em] text-surface transition-colors hover:bg-gold-deep sm:w-auto"
            >
              返回首頁繼續購物
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
