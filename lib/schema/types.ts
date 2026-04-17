// lib/schema/types.ts

export interface PriceSpecification {
  price: string;
  priceCurrency: string;
  billingPeriod?: "P1M" | "P1Y"; // شهر أو سنة
}

export interface ProductOffer {
  name: string;
  description: string;
  priceSpec: PriceSpecification;
  features: string[];
  isPopular?: boolean;
  url?: string;
}

export interface SchemaContext {
  locale: "ar" | "en";
  baseUrl: string;
  brandName: string;
  currency: string;
}

export type PlanKey = "free" | "basic" | "pro";

// lib/schema/types.ts
export interface PricingPlan {
  name: string;
  desc: string;
  price_monthly: string;  // ✅ يجب أن يكون string
  price_yearly: string;   // ✅ يجب أن يكون string
  currency: string;
  period: string;         // ✅ تأكد من وجود هذه الخاصية
  features: string[];
  popular: boolean;
  cta?: string;           // ✅ اختياري إذا لم يكن موجوداً في كل الخطط
}

export interface SchemaContext {
  locale: "ar" | "en";
  baseUrl: string;
  brandName: string;
  currency: string;
}

export type SchemaType = 
  | "SoftwareApplication"
  | "Product"
  | "Offer"
  | "FAQPage"
  | "Organization"
  | "WebSite"
  | "BreadcrumbList";
