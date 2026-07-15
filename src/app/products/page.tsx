import type { Metadata } from "next";
import { ProductCatalog } from "@/components/product-catalog";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "常規商品｜Kintsugi Studio 繕物誌",
  description:
    "瀏覽繕物誌手作選品——金繕成品、DIY 工具包與陶藝器具，每一件都帶著獨一無二的痕跡。",
};

/* -------------------------------------------------------------------------- */
/* 常規商品頁                                                                  */
/* -------------------------------------------------------------------------- */

export default function ProductsPage() {
  return (
    <div className="wabi-atmosphere relative flex min-h-full flex-col">
      <SiteHeader active="products" />

      <main className="relative z-10 flex-1">
        {/* 商店簡介 */}
        <section className="border-b border-line/40">
          <div className="mx-auto max-w-3xl px-6 py-16 text-center md:px-10 md:py-20">
            <p className="text-xs tracking-[0.3em] text-gold">Shop</p>
            <h1 className="mt-4 font-serif text-3xl text-foreground md:text-4xl">
              常規商品
            </h1>
            <div className="gold-hairline mx-auto mt-8 w-16" />
            <p className="mt-8 text-[15px] leading-8 text-muted md:text-base md:leading-9">
              每一件手作，都帶著職人的手感溫度與獨一無二的痕跡。
              我們把裂縫留下的故事，溫柔地送進日常。
            </p>
          </div>
        </section>

        {/* 分類篩選 + 產品網格 */}
        <section className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
          <ProductCatalog />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
