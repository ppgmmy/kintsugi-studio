import Link from "next/link";
import { CartNavButton } from "@/components/cart-nav-button";

/* 全站共用導航：首頁、商品、關於等內頁皆引用（/products、/about、/checkout 等） */

type SiteHeaderProps = {
  /** 目前頁面，用於強調對應導覽項目 */
  active?: "home" | "products" | "workshops" | "about" | "checkout";
};

const navClass = (isActive: boolean) =>
  isActive
    ? "text-foreground"
    : "text-muted transition-colors hover:text-foreground";

export function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="relative z-30 border-b border-line/60 bg-background/85 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5 md:px-10"
        aria-label="主要導覽"
      >
        {/* 左側品牌名 */}
        <Link
          href="/"
          className="shrink-0 font-serif text-[15px] tracking-[0.06em] text-foreground transition-opacity hover:opacity-70 md:text-lg"
        >
          <span className="hidden sm:inline">Kintsugi Studio ｜ 繕物誌</span>
          <span className="sm:hidden">繕物誌</span>
        </Link>

        {/* 右側連結 + 購物車 */}
        <div className="flex items-center gap-5 md:gap-8">
          <ul className="hidden items-center gap-7 text-[13px] tracking-wide md:flex">
            <li>
              <Link
                href="/products"
                className={navClass(active === "products")}
                aria-current={active === "products" ? "page" : undefined}
              >
                常規商品
              </Link>
            </li>
            <li>
              <Link
                href="/workshops"
                className={navClass(active === "workshops")}
                aria-current={active === "workshops" ? "page" : undefined}
              >
                體驗工作坊
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={navClass(active === "about")}
                aria-current={active === "about" ? "page" : undefined}
              >
                關於我們
              </Link>
            </li>
          </ul>

          {/* 行動版精簡選單 */}
          <ul className="flex items-center gap-4 text-xs tracking-wide md:hidden">
            <li>
              <Link
                href="/products"
                className={navClass(active === "products")}
              >
                商品
              </Link>
            </li>
            <li>
              <Link
                href="/workshops"
                className={navClass(active === "workshops")}
              >
                工作坊
              </Link>
            </li>
            <li>
              <Link href="/about" className={navClass(active === "about")}>
                關於
              </Link>
            </li>
          </ul>

          {/* 購物車圖標 + 數量徽章 → /checkout */}
          <CartNavButton />
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-line/60 bg-foreground text-surface/75">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-12 text-center md:px-10">
        <p className="font-serif text-base tracking-[0.12em] text-surface">
          Kintsugi Studio ｜ 繕物誌
        </p>
        <p className="text-xs tracking-wide text-surface/50">
          擁抱裂痕，轉化為光 · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
