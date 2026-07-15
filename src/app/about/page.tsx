import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "關於我們｜Kintsugi Studio 繕物誌",
  description:
    "認識 Kintsugi Studio ｜ 繕物誌的品牌起源、金繕哲學，以及我們如何以手作擁抱裂痕與不完美。",
};

/* -------------------------------------------------------------------------- */
/* 頁首引言                                                                    */
/* -------------------------------------------------------------------------- */

function AboutHero() {
  return (
    <section className="relative z-10 border-b border-line/40">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center md:px-10 md:py-28">
        <p className="animate-fade-up text-xs tracking-[0.3em] text-gold">
          About Us
        </p>
        <h1 className="animate-fade-up delay-1 mt-5 font-serif text-3xl leading-relaxed text-foreground md:text-4xl">
          關於繕物誌
        </h1>
        <div className="animate-gold-shimmer gold-hairline mx-auto mt-8 w-20" />
        <p className="animate-fade-up delay-2 mt-8 font-serif text-xl leading-relaxed text-foreground/90 md:text-2xl md:leading-relaxed">
          裂痕不是終點，而是故事的開端。
        </p>
        <p className="animate-fade-up delay-3 mt-6 text-[15px] leading-8 text-muted md:text-base md:leading-9">
          Kintsugi Studio ｜
          繕物誌，以金繕為名，記錄每一次被修補、被重新看見的光。
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 品牌起源                                                                    */
/* -------------------------------------------------------------------------- */

function BrandOrigin() {
  return (
    <section className="relative z-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2 md:gap-16 md:px-10 md:py-24">
        {/* 左側圖：溫暖手作氛圍 */}
        <div className="relative aspect-[4/5] overflow-hidden bg-surface-soft md:aspect-[5/6]">
          <Image
            src="/images/products/item3.jpg"
            alt="手作桌面上的陶片與工具"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div
            className="pointer-events-none absolute inset-5 border border-gold/30"
            aria-hidden="true"
          />
        </div>

        <div>
          <p className="text-xs tracking-[0.28em] text-gold">Origin</p>
          <h2 className="mt-4 font-serif text-2xl text-foreground md:text-3xl">
            品牌起源
          </h2>
          <div className="gold-hairline mt-6 w-14" />

          <div className="mt-8 space-y-5 text-[15px] leading-8 text-muted md:text-base md:leading-9">
            <p>
              「Kintsugi Studio ｜
              繕物誌」誕生於一次對破碎器物的凝視。我們發現，裂痕並非缺陷的證明，而是一段被時間留下的痕跡——它訴說使用、珍惜，以及重新開始的可能。
            </p>
            <p>
              品牌取名「繕物」，意指以雙手修繕物件，也修繕心裡那些以為無法復原的缺口。金繕的金色線條，成為我們的視覺語言：不遮掩傷處，反而讓它成為最獨特的光芒。
            </p>
            <p>
              因此我們相信——
              <span className="text-foreground">
                裂痕不是終點，而是故事的開端。
              </span>
              每一件被修復的器物，都像一本小誌，寫下接納與轉化的篇章。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 金繕哲學                                                                    */
/* -------------------------------------------------------------------------- */

function KintsugiPhilosophy() {
  return (
    <section className="relative z-10 border-y border-line/50 bg-surface/60">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs tracking-[0.28em] text-gold">Philosophy</p>
          <h2 className="mt-4 font-serif text-2xl text-foreground md:text-3xl">
            金繕哲學
          </h2>
          <p className="mt-6 text-[15px] leading-8 text-muted md:text-base md:leading-9">
            以漆為黏，以金為光——讓破碎之處，成為最動人的輪廓。
          </p>
        </div>

        <div className="gold-hairline mx-auto mt-10 w-16" />

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          {/* 工藝本身 */}
          <article className="border border-line bg-background px-7 py-9 md:px-9 md:py-10">
            <h3 className="font-serif text-xl text-foreground">器物的修復</h3>
            <p className="mt-5 text-[15px] leading-8 text-muted md:leading-9">
              金繕（Kintsugi）是源自日本的傳統修復工藝。當瓷器破碎，匠人以天然漆黏合裂片，再於接縫處敷上金粉或銀粉，使裂痕不再被掩蓋，反而被慎重地描繪出來。破損之處因而轉化為獨特的金色脈絡——每一道線，都只屬於那一件器物。
            </p>
          </article>

          {/* 人生隱喻 */}
          <article className="border border-line bg-background px-7 py-9 md:px-9 md:py-10">
            <h3 className="font-serif text-xl text-foreground">生命的隱喻</h3>
            <p className="mt-5 text-[15px] leading-8 text-muted md:leading-9">
              我們把金繕看作一種生活態度：不完美不必被抹去。挫折、失落與重來，都像器物上的裂痕——可以被接納、被照顧，也能被轉化為力量。在每一次手作裡，練習慢下來，看見自己的「縫」，並為它鍍上一層溫柔的光。
            </p>
          </article>
        </div>

        {/* 底部金句 */}
        <blockquote className="mx-auto mt-14 max-w-2xl text-center">
          <p className="font-serif text-lg leading-relaxed text-foreground md:text-xl">
            「擁抱裂痕，不是為了回到從前，而是成為更完整的自己。」
          </p>
        </blockquote>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 主理人／團隊介紹                                                            */
/* -------------------------------------------------------------------------- */

function TeamIntro() {
  return (
    <section className="relative z-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2 md:gap-16 md:px-10 md:py-24">
        <div className="order-2 md:order-1">
          <p className="text-xs tracking-[0.28em] text-gold">The Maker</p>
          <h2 className="mt-4 font-serif text-2xl text-foreground md:text-3xl">
            主理人與團隊
          </h2>
          <div className="gold-hairline mt-6 w-14" />

          <div className="mt-8 space-y-5 text-[15px] leading-8 text-muted md:text-base md:leading-9">
            <p>
              繕物誌由一群熱愛器物與手作的夥伴共同守護。主理人長年沉浸於陶藝、修復與生活美學，相信「動手」本身就是一種療癒——在漆與金粉之間，重新與時間和解。
            </p>
            <p>
              我們的工作室不大，桌上常散落陶片、毛刷與金粉匣。訪客來時，我們會先泡一壺茶，再一起看那道裂縫：它從哪裡開始，又將如何被溫柔地接回。
            </p>
            <p>
              無論你是想體驗金繕、尋找一件帶故事的選品，或只是想坐下來喘口氣——歡迎來到繕物誌。我們在這裡，陪你慢慢修，慢慢亮。
            </p>
          </div>

          <p className="mt-8 font-serif text-base tracking-[0.08em] text-foreground">
            —— 繕物誌團隊 敬上
          </p>
        </div>

        {/* 右側溫暖人像／工作室意象 */}
        <div className="relative order-1 aspect-[4/5] overflow-hidden bg-surface-soft md:order-2 md:aspect-[5/6]">
          <Image
            src="/images/hero.jpg"
            alt="工作室中雙手輕觸陶土的溫暖瞬間"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div
            className="pointer-events-none absolute inset-5 border border-gold/30"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 底部 CTA                                                                    */
/* -------------------------------------------------------------------------- */

function AboutCta() {
  return (
    <section className="relative z-10 border-t border-line/50 bg-surface/70">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center md:px-10 md:py-24">
        <p className="text-xs tracking-[0.28em] text-gold">Next Step</p>
        <h2 className="mt-4 font-serif text-2xl text-foreground md:text-3xl">
          開始你的繕物之旅
        </h2>
        <p className="mx-auto mt-6 max-w-md text-[15px] leading-8 text-muted md:text-base">
          無論是親身感受金繕，或帶一件選品回家，都是與不完美溫柔相遇的方式。
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <Link
            href="/workshops"
            className="inline-flex w-full items-center justify-center border border-gold bg-gold px-8 py-3.5 text-sm tracking-[0.18em] text-surface transition-colors duration-300 hover:border-gold-deep hover:bg-gold-deep sm:w-auto"
          >
            探索體驗工作坊
          </Link>
          <Link
            href="/products"
            className="inline-flex w-full items-center justify-center border border-gold/70 bg-transparent px-8 py-3.5 text-sm tracking-[0.18em] text-foreground transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-surface sm:w-auto"
          >
            瀏覽手作品
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 關於我們頁面                                                                */
/* -------------------------------------------------------------------------- */

export default function AboutPage() {
  return (
    <div className="wabi-atmosphere relative flex min-h-full flex-col">
      <SiteHeader active="about" />
      <main className="relative z-10 flex-1">
        <AboutHero />
        <BrandOrigin />
        <KintsugiPhilosophy />
        <TeamIntro />
        <AboutCta />
      </main>
      <SiteFooter />
    </div>
  );
}
