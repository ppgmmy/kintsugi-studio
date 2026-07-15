"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

/** Navbar 右上角購物車圖標：顯示目前件數，導向結帳頁 */
export function CartNavButton() {
  const { totalQuantity } = useCart();

  return (
    <Link
      href="/checkout"
      className="relative inline-flex h-9 w-9 items-center justify-center text-foreground transition-colors hover:text-gold"
      aria-label={`購物車，目前 ${totalQuantity} 件商品`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="h-[18px] w-[18px]"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h1.5l1.2 9h11.1l1.35-6.75H7.2M9 20.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.25 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
        />
      </svg>

      {/* 數量徽章：有商品時才顯示 */}
      {totalQuantity > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-medium leading-none text-surface">
          {totalQuantity > 99 ? "99+" : totalQuantity}
        </span>
      )}
    </Link>
  );
}
