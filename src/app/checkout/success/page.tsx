import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutSuccessView } from "@/components/checkout-success-view";

export const metadata: Metadata = {
  title: "付款成功｜Kintsugi Studio 繕物誌",
  description: "感謝您的訂購，我們已收到您的訂單。",
};

/** 付款成功頁：Suspense 包住 useSearchParams */
export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="wabi-atmosphere flex min-h-full items-center justify-center text-sm text-muted">
          載入中…
        </div>
      }
    >
      <CheckoutSuccessView />
    </Suspense>
  );
}
