"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { useCart } from "@/context/CartContext";

/**
 * 付款成功頁（Client）
 * - 進入時自動清空 CartContext
 * - 可顯示 Stripe 回傳的 session_id（示意）
 */
export function CheckoutSuccessView() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const clearedRef = useRef(false);

  // 進入成功頁即清空購物車（只執行一次，避免 Strict Mode 重複觸發造成困惑）
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
          <p className="text-xs tracking-[0.3em] text-gold">Payment Complete</p>
          <h1 className="mt-5 font-serif text-3xl leading-relaxed text-foreground md:text-4xl">
            付款成功
          </h1>
          <div className="gold-hairline mx-auto mt-8 w-16" />

          <p className="mt-8 font-serif text-lg leading-relaxed text-foreground md:text-xl">
            感謝您支持繕物誌。
          </p>
          <p className="mt-4 text-[15px] leading-8 text-muted md:text-base md:leading-9">
            我們已收到您的訂單，確認信已寄出。
            若信箱未見信件，請檢查垃圾郵件夾，或稍後與我們聯絡。
          </p>

          {sessionId && (
            <p className="mt-6 break-all text-[11px] tracking-wide text-muted/80">
              訂單參照：{sessionId}
            </p>
          )}

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center border border-gold bg-gold px-8 py-3.5 text-sm tracking-[0.18em] text-surface transition-colors hover:bg-gold-deep sm:w-auto"
            >
              返回首頁
            </Link>
            <Link
              href="/products"
              className="inline-flex w-full items-center justify-center border border-line px-8 py-3.5 text-sm tracking-[0.18em] text-foreground transition-colors hover:border-gold sm:w-auto"
            >
              繼續選購
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
