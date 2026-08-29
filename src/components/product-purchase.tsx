"use client";

import Link from "next/link";
import { useState } from "react";
import {
  formatHkd,
  type Product,
} from "@/constants/data";
import { useCart } from "@/context/CartContext";

/* -------------------------------------------------------------------------- */
/* 詳情頁：規格選擇 + 加入購物車                                               */
/* -------------------------------------------------------------------------- */

export function ProductPurchase({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const hasVariants = Boolean(product.variants?.length);
  const [variantId, setVariantId] = useState<string>(
    product.variants?.[0]?.id ?? "",
  );
  const [added, setAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const savings =
    product.originalPrice && product.originalPrice > product.price
      ? product.originalPrice - product.price
      : 0;

  function handleAdd() {
    setError(null);
    try {
      addToCart(product, hasVariants ? { variantId } : undefined);
      setAdded(true);
      window.setTimeout(() => setAdded(false), 1400);
    } catch (err) {
      setError(err instanceof Error ? err.message : "無法加入購物車");
    }
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="font-serif text-2xl text-gold">{formatHkd(product.price)}</p>
        {product.originalPrice && product.originalPrice > product.price ? (
          <>
            <p className="text-sm text-muted line-through">
              {formatHkd(product.originalPrice)}
            </p>
            <p className="text-xs tracking-wide text-gold">
              即慳 {formatHkd(savings)}
            </p>
          </>
        ) : null}
      </div>

      {hasVariants ? (
        <div>
          <p className="text-xs tracking-[0.18em] text-muted">選擇香味</p>
          <div
            className="mt-3 flex flex-wrap gap-2"
            role="radiogroup"
            aria-label="選擇香味"
          >
            {product.variants?.map((variant) => {
              const selected = variant.id === variantId;
              return (
                <button
                  key={variant.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setVariantId(variant.id)}
                  className={`border px-4 py-2 text-xs tracking-[0.14em] transition-colors duration-300 ${
                    selected
                      ? "border-gold bg-gold text-surface"
                      : "border-line bg-surface text-muted hover:border-gold/60 hover:text-foreground"
                  }`}
                >
                  {variant.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex flex-1 items-center justify-center border border-gold bg-gold px-6 py-3.5 text-xs tracking-[0.18em] text-surface transition-colors duration-300 hover:bg-gold-deep"
        >
          {added ? "已加入 ✓" : "加入購物車"}
        </button>
        <Link
          href="/checkout"
          className="inline-flex flex-1 items-center justify-center border border-gold/70 bg-surface px-6 py-3.5 text-xs tracking-[0.18em] text-foreground transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-surface"
        >
          前往結帳
        </Link>
      </div>
    </div>
  );
}
