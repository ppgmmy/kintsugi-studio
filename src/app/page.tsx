import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  formatHkd,
  getFeaturedProducts,
  getLatestWorkshops,
} from "@/constants/data";

/* -------------------------------------------------------------------------- */
/* 主視覺區                                                                    */
/* -------------------------------------------------------------------------- */

function HeroSection() {
  return (
    <section className="relative z-10">
      <div className="mx-auto grid min-h-[78vh] max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 md:min-h-[88vh] md:grid-cols-2 md:gap-16 md:px-10 md:py-20">
        <div className="order-2 md:order-1">
          <p className="animate-fade-up font-serif text-sm tracking-[0.28em] text-gold md:text-base">
            Kintsugi Studio
          </p>
          <p className="animate-fade-up delay-1 mt-2 font-serif text-2xl tracking-[0.2em] text-foreground md:text-3xl">
            繕物誌
          </p>

          <div className="animate-gold-shimmer gold-hairline my-8 w-24" />

          <h1 className="animate-fade-up delay-1 max-w-md font-serif text-3xl leading-[1.45] text-foreground md:text-[2.65rem] md:leading-[1.4]">
            裂痕不是終點，而是故事的開端。
          </h1>

          <p className="animate-fade-up delay-2 mt-6 max-w-md text-[15px] leading-8 text-muted md:text-base md:leading-9">
            以金繕哲學，修繕生活中的不完美。在每一次手工藝中，練習接納與轉化。
          </p>

          <div className="animate-fade-up delay-3 mt-10">
            <Link
              href="/workshops"
              className="inline-flex items-center border border-gold bg-gold px-8 py-3.5 text-sm tracking-[0.18em] text-surface transition-colors duration-300 hover:border-gold-deep hover:bg-gold-deep"
            >
              探索工作坊體驗
            </Link>
          </div>
        </div>

        <div className="animate-fade-in relative order-1 aspect-[4/5] w-full overflow-hidden bg-surface-soft md:order-2 md:aspect-auto md:h-[min(72vh,640px)]">
          <Image
            src="/images/hero.jpg"
            alt="陶藝與修補手作場景"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div
            className="pointer-events-none absolute inset-4 border border-gold/35 md:inset-6"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 精選商品：取 data.ts 前 3 件                                                */
/* -------------------------------------------------------------------------- */

function FeaturedGallery() {
  const featuredProducts = getFeaturedProducts(3);

  return (
    <section className="relative z-10 border-t border-line/50">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs tracking-[0.3em] text-gold">Featured</p>
          <h2 className="mt-4 font-serif text-2xl leading-relaxed text-foreground md:text-3xl">
            繕物選品 ── 將裂痕轉化為獨特光芒
          </h2>
        </div>

        <div className="gold-hairline mx-auto mt-10 w-16" />

        <ul className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {featuredProducts.map((product, index) => (
            <li
              key={product.id}
              className="animate-fade-up group"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <article>
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-soft">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="mt-6 space-y-2 text-center">
                  <h3 className="font-serif text-xl text-foreground">
                    {product.name}
                  </h3>
                  <p className="text-sm tracking-wide text-muted">
                    {formatHkd(product.price)}
                  </p>
                </div>

                <div className="mt-5 flex justify-center">
                  <Link
                    href="/products"
                    className="inline-flex border border-gold/70 px-6 py-2.5 text-xs tracking-[0.2em] text-foreground transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-surface"
                  >
                    查看詳情
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 最新工作坊：取 data.ts 最新課程                                              */
/* -------------------------------------------------------------------------- */

function LatestWorkshops() {
  const workshops = getLatestWorkshops(2);

  return (
    <section className="relative z-10 border-t border-line/50 bg-surface/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs tracking-[0.3em] text-gold">Workshops</p>
          <h2 className="mt-4 font-serif text-2xl text-foreground md:text-3xl">
            最新工作坊
          </h2>
          <p className="mt-6 text-[15px] leading-8 text-muted md:text-base md:leading-9">
            在每一次手工藝中，練習接納與轉化。
          </p>
        </div>

        <div className="gold-hairline mx-auto mt-10 w-16" />

        <ul className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
          {workshops.map((workshop) => (
            <li key={workshop.id}>
              <article className="overflow-hidden border border-line bg-background">
                <div className="relative aspect-[16/10] bg-surface-soft">
                  <Image
                    src={workshop.image}
                    alt={workshop.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="px-6 py-7 md:px-8">
                  <p className="text-xs tracking-widest text-gold">
                    {workshop.datetime}
                  </p>
                  <h3 className="mt-3 font-serif text-xl text-foreground md:text-2xl">
                    {workshop.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {workshop.location}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    剩餘{" "}
                    <span className="font-medium text-gold">
                      {workshop.spotsLeft}
                    </span>{" "}
                    位
                    {workshop.originalPrice ? (
                      <>
                        {" · "}
                        <span className="line-through opacity-70">
                          {formatHkd(workshop.originalPrice)}
                        </span>{" "}
                        <span className="font-medium text-gold">
                          {formatHkd(workshop.price)}／人
                        </span>
                      </>
                    ) : (
                      <> · {formatHkd(workshop.price)}／人</>
                    )}
                  </p>
                  <Link
                    href="/workshops"
                    className="mt-6 inline-flex border border-gold bg-gold px-6 py-2.5 text-xs tracking-[0.18em] text-surface transition-colors hover:bg-gold-deep"
                  >
                    立即預約
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link
            href="/workshops"
            className="text-sm tracking-wide text-gold underline-offset-4 transition-colors hover:underline"
          >
            查看全部工作坊
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 聯絡／預約查詢區塊                                                          */
/* -------------------------------------------------------------------------- */

function WorkshopsContact() {
  return (
    <section className="relative z-10 border-t border-line/50 bg-surface/70">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs tracking-[0.3em] text-gold">Contact</p>
          <h2 className="mt-4 font-serif text-2xl text-foreground md:text-3xl">
            一同修繕生活
          </h2>
          <p className="mt-6 text-[15px] leading-8 text-muted md:text-base md:leading-9">
            歡迎查詢金繕體驗工作坊、企業包班或活動合作。
          </p>

          <div className="mt-10">
            <a
              href="#booking"
              className="inline-flex border border-foreground bg-foreground px-8 py-3.5 text-sm tracking-[0.18em] text-surface transition-colors duration-300 hover:border-gold hover:bg-gold"
            >
              聯絡我們 / 預約查詢
            </a>
          </div>
        </div>

        <div
          id="booking"
          className="mx-auto mt-20 max-w-lg scroll-mt-28 border border-line bg-background px-6 py-10 md:px-10 md:py-12"
        >
          <h3 className="text-center font-serif text-xl text-foreground md:text-2xl">
            預約查詢
          </h3>
          <p className="mt-3 text-center text-sm leading-7 text-muted">
            留下訊息，我們會盡快與您聯繫。
          </p>

          <form className="mt-8 space-y-5" action="#" method="post">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs tracking-[0.15em] text-muted"
              >
                姓名
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold"
                placeholder="您的姓名"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs tracking-[0.15em] text-muted"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="interest"
                className="mb-2 block text-xs tracking-[0.15em] text-muted"
              >
                諮詢類型
              </label>
              <select
                id="interest"
                name="interest"
                className="w-full border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold"
                defaultValue="workshop"
              >
                <option value="workshop">金繕體驗工作坊</option>
                <option value="corporate">企業包班</option>
                <option value="collab">活動合作</option>
                <option value="other">其他</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-xs tracking-[0.15em] text-muted"
              >
                訊息
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full resize-y border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold"
                placeholder="請簡述您想了解的內容…"
              />
            </div>

            <button
              type="submit"
              className="w-full border border-gold bg-gold py-3.5 text-sm tracking-[0.2em] text-surface transition-colors duration-300 hover:border-gold-deep hover:bg-gold-deep"
            >
              送出查詢
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 首頁                                                                        */
/* -------------------------------------------------------------------------- */

export default function Home() {
  return (
    <div className="wabi-atmosphere relative flex min-h-full flex-col">
      <SiteHeader active="home" />
      <main className="relative z-10 flex-1">
        <HeroSection />
        <FeaturedGallery />
        <LatestWorkshops />
        <WorkshopsContact />
      </main>
      <SiteFooter />
    </div>
  );
}
