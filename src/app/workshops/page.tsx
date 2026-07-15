import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WorkshopCatalog } from "@/components/workshop-booking";

export const metadata: Metadata = {
  title: "體驗工作坊｜Kintsugi Studio 繕物誌",
  description:
    "在每一次手工藝中，練習接納與轉化。預約繕物誌金繕體驗與進階工作坊。",
};

/* -------------------------------------------------------------------------- */
/* 體驗工作坊頁                                                                */
/* -------------------------------------------------------------------------- */

export default function WorkshopsPage() {
  return (
    <div className="wabi-atmosphere relative flex min-h-full flex-col">
      <SiteHeader active="workshops" />

      <main className="relative z-10 flex-1">
        {/* 頂部大標題 */}
        <section className="border-b border-line/40">
          <div className="mx-auto max-w-3xl px-6 py-16 text-center md:px-10 md:py-24">
            <p className="text-xs tracking-[0.3em] text-gold">Workshops</p>
            <h1 className="mt-5 font-serif text-2xl leading-relaxed text-foreground md:text-4xl md:leading-relaxed">
              在每一次手工藝中，練習接納與轉化。
            </h1>
            <div className="gold-hairline mx-auto mt-8 w-16" />
            <p className="mt-8 text-[15px] leading-8 text-muted md:text-base md:leading-9">
              常設金繕課程採小班制，歡迎預約體驗。名額有限，額滿將提前截止報名。
            </p>
          </div>
        </section>

        {/* 工作坊列表 + 預約 Modal */}
        <section className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
          <WorkshopCatalog />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
