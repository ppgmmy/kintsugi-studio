import { redirect } from "next/navigation";

/**
 * 相容路徑：若 Stripe / 舊設定導向 /success，
 * 一律轉到正式成功頁 /checkout/success（保留 query）
 */
export default async function SuccessAliasPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") query.set(key, value);
    else if (Array.isArray(value) && value[0]) query.set(key, value[0]);
  }

  const qs = query.toString();
  redirect(qs ? `/checkout/success?${qs}` : "/checkout/success");
}
