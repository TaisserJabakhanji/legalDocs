// lib/schema/index.ts
import { SchemaContext } from './types';
import { 
  generateSoftwareSchema, 
  generateProductSchema,  
  generateFAQSchema,
  generateWebSiteSchema 
} from "@/lib/schema/generators";

export function generatePageSchema(ctx: {
  locale: "ar" | "en";
  baseUrl: string;
  brandName: string;
  currency?: string;
  plans: Array<{
    name: string;
    description: string;
    priceSpec: { price: string; priceCurrency: string; billingPeriod?: "P1M" | "P1Y" };
    features: string[];
  }>;
  faqItems: Array<{ question: string; answer: string }>;
}): unknown[] {
  const fullCtx: SchemaContext = {
    ...ctx,
    currency: ctx.currency || 'USD'
  };
  return [
    generateWebSiteSchema(fullCtx),
    generateSoftwareSchema(fullCtx),
    ...ctx.plans.map((plan) => generateProductSchema(plan, fullCtx)),
    generateFAQSchema(ctx.faqItems, fullCtx)
  ];
}



