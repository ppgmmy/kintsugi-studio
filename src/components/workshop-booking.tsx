"use client";

import Image from "next/image";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { formatHkd, WORKSHOPS, type Workshop } from "@/constants/data";

/* -------------------------------------------------------------------------- */
/* 預約 Modal                                                                  */
/* -------------------------------------------------------------------------- */

type BookingModalProps = {
  workshop: Workshop | null;
  open: boolean;
  onClose: () => void;
};

function BookingModal({ workshop, open, onClose }: BookingModalProps) {
  const titleId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setSubmitted(false);
    setSubmitting(false);

    const timer = window.setTimeout(() => firstFieldRef.current?.focus(), 40);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !workshop) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 650));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-foreground/45 backdrop-blur-[2px]"
        aria-label="關閉預約視窗"
        onClick={onClose}
      />

      <div className="relative z-10 max-h-[92vh] w-full overflow-y-auto border border-line bg-background shadow-[0_20px_60px_rgba(45,45,45,0.18)] sm:max-w-lg">
        <div className="flex items-start justify-between gap-4 border-b border-line/70 px-6 py-5 md:px-8">
          <div>
            <p className="text-xs tracking-[0.25em] text-gold">Booking</p>
            <h2
              id={titleId}
              className="mt-2 font-serif text-xl text-foreground md:text-2xl"
            >
              {submitted ? "預約成功" : "立即預約"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-1 text-muted transition-colors hover:text-foreground"
            aria-label="關閉"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-6 md:px-8 md:py-8">
          {submitted ? (
            <div className="py-6 text-center">
              <div className="gold-hairline mx-auto w-14" />
              <p className="mt-8 font-serif text-lg leading-relaxed text-foreground md:text-xl">
                預約成功！我們將會發送電郵確認信給您。
              </p>
              <p className="mt-4 text-sm leading-7 text-muted">
                已為「{workshop.title}」留下您的預約資料（示意）。
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-10 inline-flex border border-gold bg-gold px-8 py-3 text-sm tracking-[0.18em] text-surface transition-colors hover:bg-gold-deep"
              >
                關閉
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm leading-7 text-muted">
                <span className="text-foreground">{workshop.title}</span>
                <br />
                {workshop.datetime} · {formatHkd(workshop.price)}／人
                <br />
                {workshop.location}
              </p>

              <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="booking-name"
                    className="mb-2 block text-xs tracking-[0.15em] text-muted"
                  >
                    姓名
                  </label>
                  <input
                    ref={firstFieldRef}
                    id="booking-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold"
                    placeholder="您的姓名"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-phone"
                    className="mb-2 block text-xs tracking-[0.15em] text-muted"
                  >
                    電話
                  </label>
                  <input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    className="w-full border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold"
                    placeholder="9123 4567"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-email"
                    className="mb-2 block text-xs tracking-[0.15em] text-muted"
                  >
                    電郵
                  </label>
                  <input
                    id="booking-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-guests"
                    className="mb-2 block text-xs tracking-[0.15em] text-muted"
                  >
                    人數
                  </label>
                  <select
                    id="booking-guests"
                    name="guests"
                    required
                    defaultValue="1"
                    className="w-full border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold"
                  >
                    {Array.from(
                      { length: Math.min(workshop.spotsLeft, 4) },
                      (_, index) => index + 1,
                    ).map((count) => (
                      <option key={count} value={count}>
                        {count} 位
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full border border-gold bg-gold py-3.5 text-sm tracking-[0.2em] text-surface transition-colors hover:bg-gold-deep disabled:cursor-wait disabled:opacity-70"
                >
                  {submitting ? "送出中…" : "確認預約"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 工作坊列表（資料來自 constants/data.ts）                                     */
/* -------------------------------------------------------------------------- */

export function WorkshopCatalog() {
  const [selected, setSelected] = useState<Workshop | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function openBooking(workshop: Workshop) {
    setSelected(workshop);
    setModalOpen(true);
  }

  function closeBooking() {
    setModalOpen(false);
  }

  return (
    <>
      <ul className="space-y-10 md:space-y-14">
        {WORKSHOPS.map((workshop) => (
          <li key={workshop.id}>
            <article className="grid grid-cols-1 overflow-hidden border border-line bg-surface/50 md:grid-cols-2">
              <div className="relative aspect-[16/11] bg-surface-soft md:aspect-auto md:min-h-[280px]">
                <Image
                  src={workshop.image}
                  alt={workshop.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-10">
                <h2 className="font-serif text-2xl text-foreground md:text-[1.75rem]">
                  {workshop.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {workshop.description}
                </p>

                <dl className="mt-6 space-y-2 text-sm text-muted">
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="text-foreground/80">日期時間</dt>
                    <dd>{workshop.datetime}</dd>
                  </div>
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="text-foreground/80">地點</dt>
                    <dd>{workshop.location}</dd>
                  </div>
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="text-foreground/80">剩餘名額</dt>
                    <dd>
                      <span className="font-medium text-gold">
                        {workshop.spotsLeft}
                      </span>{" "}
                      位
                    </dd>
                  </div>
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="text-foreground/80">費用</dt>
                    <dd className="text-foreground">
                      {formatHkd(workshop.price)}／人
                    </dd>
                  </div>
                </dl>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => openBooking(workshop)}
                    className="inline-flex border border-gold bg-gold px-7 py-3 text-sm tracking-[0.18em] text-surface transition-colors duration-300 hover:border-gold-deep hover:bg-gold-deep"
                  >
                    立即預約
                  </button>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <BookingModal
        workshop={selected}
        open={modalOpen}
        onClose={closeBooking}
      />
    </>
  );
}
