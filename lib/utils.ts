export function getBillingPeriod(isYearly: boolean): "P1M" | "P1Y" {
  return isYearly ? "P1Y" : "P1M";
}