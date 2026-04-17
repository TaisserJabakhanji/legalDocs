// lib/schema/generators.ts
import { SchemaContext, ProductOffer, PriceSpecification } from "./types";

// ✅ توليد Schema للمنظمة
export function generateOrganizationSchema(ctx: SchemaContext) {
  const { locale, baseUrl, brandName } = ctx;
  const isAr = locale === "ar";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": brandName,
    "alternateName": isAr ? "Legal Docs" : "المستندات القانونية",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "sameAs": [
      "https://twitter.com/legaldocs",
      "https://linkedin.com/company/legaldocs",
      "https://github.com/legaldocs"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+962-6-1234567",
      "contactType": "customer service",
      "areaServed": ["AE", "SA", "EG", "JO", "US", "KW", "QA"],
      "availableLanguage": ["Arabic", "English"],
      "email": "support@legaldocs.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "JO",
      "addressRegion": "Amman"
    }
  };
}

// ✅ توليد Schema للتطبيق البرمجي
export function generateSoftwareSchema(ctx: SchemaContext) {
  const { locale, baseUrl, brandName } = ctx;
  const isAr = locale === "ar";

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": brandName,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": ctx.currency,
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1247",
      "bestRating": "5",
      "worstRating": "1"
    },
    "description": isAr
      ? "منصة لإنشاء وإدارة المستندات القانونية باحترافية"
      : "Platform to create and manage professional legal documents",
    "screenshot": `${baseUrl}/og-image.png`,
    "softwareVersion": "2.0",
    "url": baseUrl
  };
}

// ✅ توليد Schema لعرض سعر (منتج)
export function generateProductSchema(
  offer: ProductOffer,
  ctx: SchemaContext
) {
  const { baseUrl, currency } = ctx;
  const planSlug = offer.name.toLowerCase().replace(/\s+/g, "-");

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": offer.name,
    "description": offer.description,
    "brand": {
      "@type": "Brand",
      "name": ctx.brandName
    },
    "offers": {
      "@type": "Offer",
      "price": offer.priceSpec.price,
      "priceCurrency": offer.priceSpec.priceCurrency || currency,
      "availability": "https://schema.org/InStock",
      "url": `${baseUrl}/pricing?plan=${planSlug}`,
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": ctx.brandName
      },
      ...(offer.priceSpec.billingPeriod && {
        "billingDuration": offer.priceSpec.billingPeriod
      })
    },
    "additionalProperty": offer.features.map((feature) => ({
      "@type": "PropertyValue",
      "name": "Feature",
      "value": feature
    })),
    "isAccessibleForFree": offer.priceSpec.price === "0"
  };
}

// ✅ توليد Schema لصفحة الأسئلة الشائعة
export function generateFAQSchema(
  faqItems: Array<{ question: string; answer: string }>,
  ctx: SchemaContext
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

// ✅ توليد Schema لموقع الويب
export function generateWebSiteSchema(ctx: SchemaContext) {
  const { locale, baseUrl, brandName } = ctx;
  const isAr = locale === "ar";

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": brandName,
    "alternateName": isAr ? "Legal Docs" : "المستندات القانونية",
    "url": baseUrl,
    "inLanguage": locale,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}