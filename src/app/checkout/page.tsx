import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout-view";

export const metadata: Metadata = {
  title: "結帳｜Kintsugi Studio 繕物誌",
  description: "以港幣（HKD）完成繕物誌手作選品結帳。",
};

/** 結帳頁（Server）：metadata + Client 結帳介面 */
export default function CheckoutPage() {
  return <CheckoutView />;
}
