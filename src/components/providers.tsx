"use client";

import { CartProvider } from "@/context/CartContext";

/** 根層 Client Providers：包住需要全域狀態的功能 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
