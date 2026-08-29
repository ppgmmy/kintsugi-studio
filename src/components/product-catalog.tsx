"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  formatHkd,
  PRODUCT_CATEGORY_LABELS,
  PRODUCTS,
  type ProductCategory,
} from "@/constants/data";
import { useCart } from "@/context/CartContext";

/* -------------------------------------------------------------------------- */
/* 分類 Tab 定義                                                               */
/* -------------------------------------------------------------------------- */

const CATEGORIES: { id: "all" | ProductCategory; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "candles", label: PRODUCT_CATEGORY_LABELS.candles },
  { id: "skincare", label: PRODUCT_CATEGORY_LABELS.skincare },
  { id: "candle_sets", label: PRODUCT_CATEGORY_LABELS.candle_sets },
  { id: "winter_sets", label: PRODUCT_CATEGORY_LABELS.winter_sets },
  { id: "surprise_sets", label: PRODUCT_CATEGORY_LABELS.surprise_sets },
];

/* -------------------------------------------------------------------------- */
/* 分類 Tab + 商品網格（資料來自 constants/data.ts）                            */
/* -------------------------------------------------------------------------- */

export function ProductCatalog() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<"all" | ProductCategory>(
    "all",
  );
  const [addedId, setAddedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return PRODUCTS;
    return PRODUCTS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  function handleAdd(productId: string) {
    const product = PRODUCTS.find((item) => item.id === productId);
    if (!product) return;
    if (product.variants?.length) return;
    addToCart(product);
    setAddedId(productId);
    window.setTimeout(() => {
      setAddedId((current) => (current === productId ? null : current));
    }, 1200);
  }

  return (
    <div>
      <div
        className="flex flex-wrap items-center justify-center gap-2 md:gap-3"
        role="tablist"
        aria-label="商品分類"
      >
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(category.id)}
              className={`border px-4 py-2 text-xs tracking-[0.16em] transition-colors duration-300 md:px-5 md:text-[13px] ${
                isActive
                  ? "border-gold bg-gold text-surface"
                  : "border-line bg-surface text-muted hover:border-gold/60 hover:text-foreground"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        共 {filtered.length} 件選品
      </p>

      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
        {filtered.map((product) => {
          const hasVariants = Boolean(product.variants?.length);
          const hasDiscount =
            Boolean(product.originalPrice) &&
            (product.originalPrice as number) > product.price;

          return (
            <li key={product.id} className="animate-fade-up group">
              <article className="flex h-full flex-col">
                <Link
                  href={`/products/${product.id}`}
                  className="relative aspect-[4/5] overflow-hidden bg-surface-soft"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-4 border border-gold/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </Link>

                <div className="mt-5 flex flex-1 flex-col">
                  <p className="text-[11px] tracking-[0.18em] text-gold">
                    {PRODUCT_CATEGORY_LABELS[product.category]}
                  </p>
                  <h2 className="mt-1.5 font-serif text-base leading-snug text-foreground sm:text-xl">
                    <Link
                      href={`/products/${product.id}`}
                      className="transition-colors hover:text-gold"
                    >
                      {product.name}
                    </Link>
                  </h2>
                  <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <p className="text-sm tracking-wide text-gold">
                      {formatHkd(product.price)}
                    </p>
                    {hasDiscount ? (
                      <p className="text-xs text-muted line-through">
                        {formatHkd(product.originalPrice as number)}
                      </p>
                    ) : null}
                  </div>
                  <p className="mt-3 flex-1 text-xs leading-6 text-muted sm:text-sm sm:leading-7">
                    {product.description}
                  </p>

                  {hasVariants ? (
                    <Link
                      href={`/products/${product.id}`}
                      className="mt-6 block w-full border border-gold/70 bg-surface px-3 py-2.5 text-center text-[11px] tracking-[0.14em] text-foreground transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-surface sm:px-4 sm:py-3 sm:text-xs sm:tracking-[0.18em]"
                    >
                      選擇香味
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAdd(product.id)}
                      className="mt-6 w-full border border-gold/70 bg-surface px-3 py-2.5 text-[11px] tracking-[0.14em] text-foreground transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-surface sm:px-4 sm:py-3 sm:text-xs sm:tracking-[0.18em]"
                    >
                      {addedId === product.id ? "已加入 ✓" : "加入購物車"}
                    </button>
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-muted">
          此分類暫無商品，請選擇其他分類。
        </p>
      )}
    </div>
  );
}
