import Image from "next/image";
import Link from "next/link";
import {
  PRODUCT_CATEGORY_LABELS,
  type Product,
} from "@/constants/data";
import { ProductPurchase } from "@/components/product-purchase";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

/* -------------------------------------------------------------------------- */
/* 商品詳情頁版面                                                              */
/* -------------------------------------------------------------------------- */

export function ProductDetailView({ product }: { product: Product }) {
  const detailBlocks = [
    product.details
      ? { title: "商品介紹", body: product.details }
      : null,
    product.ingredients
      ? { title: "主要成分", body: product.ingredients }
      : null,
    product.usage ? { title: "使用方法", body: product.usage } : null,
    product.warnings ? { title: "注意事項", body: product.warnings } : null,
  ].filter(Boolean) as { title: string; body: string }[];

  return (
    <div className="wabi-atmosphere relative flex min-h-full flex-col">
      <SiteHeader active="products" />

      <main className="relative z-10 flex-1">
        <section className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-16">
          <nav className="text-xs tracking-wide text-muted">
            <Link href="/products" className="transition-colors hover:text-gold">
              常規商品
            </Link>
            <span className="mx-2 text-line" aria-hidden="true">
              /
            </span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="mt-8 grid grid-cols-1 items-start gap-10 md:mt-12 md:grid-cols-2 md:gap-14 lg:gap-16">
            <div className="relative aspect-[4/5] overflow-hidden bg-surface-soft">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div>
              <p className="text-[11px] tracking-[0.18em] text-gold">
                {PRODUCT_CATEGORY_LABELS[product.category]}
              </p>
              <h1 className="mt-3 font-serif text-3xl leading-snug text-foreground md:text-4xl">
                {product.name}
              </h1>
              <div className="gold-hairline mt-6 w-14" />
              <p className="mt-6 text-[15px] leading-8 text-muted">
                {product.description}
              </p>

              <ProductPurchase product={product} />
            </div>
          </div>

          {detailBlocks.length > 0 ? (
            <div className="mt-16 grid grid-cols-1 gap-10 border-t border-line/50 pt-12 md:mt-20 md:grid-cols-2 md:gap-12">
              {detailBlocks.map((block) => (
                <article key={block.title}>
                  <h2 className="font-serif text-xl text-foreground">
                    {block.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{block.body}</p>
                </article>
              ))}
            </div>
          ) : null}

          <div className="mt-14 text-center">
            <Link
              href="/products"
              className="inline-flex border border-line px-6 py-3 text-xs tracking-[0.18em] text-muted transition-colors hover:border-gold hover:text-foreground"
            >
              ← 返回商品列表
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
