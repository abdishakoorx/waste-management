export function calculatePriceWithVAT(
  priceBeforeVat: number,
  vat: number
): number {
  return Math.round(priceBeforeVat * (1 + vat / 100));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
