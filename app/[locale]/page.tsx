// app/[locale]/page.tsx
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { HowItWorks } from "@/components/HowItWorks/HowItWorks";
import { Features } from "@/components/Features/Features";
import { Pricing } from "@/components/Pricing/Pricing";
import { FAQ } from "@/components/FAQ/FAQ";
import { CTA } from "@/components/CTA/CTA";
import { Footer } from "@/components/Footer/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { 
  generateSoftwareSchema, 
  generateProductSchema,
  generateFAQSchema,
  generateWebSiteSchema 
} from "@/lib/schema/generators";

import type { Metadata } from "next";

// دالة مساعدة لجلب بيانات الـ Schema
async function getSchemaData(locale: string) {
  const isAr = locale === "ar";
  
  const plans = [
    {
      name: isAr ? "مجاني" : "Free",
      description: isAr ? "مثالي للتجربة" : "Perfect for trying out",
      price_monthly: "0",
      price_yearly: "0",
      currency: "USD",
      period: "",
      features: isAr ? ["3 مستندات شهرياً", "تصدير PDF"] : ["3 docs/month", "PDF export"],
      popular: false,
      cta: isAr ? "ابدأ مجاناً" : "Get Started Free",
    },
    {
      name: isAr ? "أساسي" : "Basic",
      description: isAr ? "للمحترفين" : "For professionals",
      price_monthly: "6.99",
      price_yearly: "5.59",
      currency: "USD",
      period: "لكل شهر",
      features: isAr ? ["30 مستند شهرياً", "دعم عبر الدردشة"] : ["30 docs/month", "Live chat"],
      popular: false,
      cta: isAr ? "اشترك الآن" : "Subscribe Now",
    },
    {
      name: isAr ? "محترف" : "Pro",
      description: isAr ? "للفرق والشركات" : "For teams and businesses",
      price_monthly: "19.99",
      price_yearly: "15.99",
      currency: "USD",
      period: "لكل شهر",
      features: isAr ? ["مستندات غير محدودة", "🤖 خبير قانوني ذكي"] : ["Unlimited docs", "🤖 AI Legal Expert"],
      popular: true,
      cta: isAr ? "ابدأ الخطة الاحترافية" : "Start Pro Plan",
    }
  ];

  const faqItems = [
    {
      question: isAr ? "هل المنصة مجانية حقاً؟" : "Is the platform really free?",
      answer: isAr ? "نعم، خطة مجانية مدى الحياة." : "Yes, forever-free plan available."
    },
    {
      question: isAr ? "هل يمكنني استرداد أموالي؟" : "Can I get a refund?",
      answer: isAr ? "نعم، ضمان استرداد 30 يوماً." : "Yes, 30-day money-back guarantee."
    }
  ];

  return { plans, faqItems };
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: isAr ? "%s | المستندات القانونية" : "%s | Legal Docs",
      default: isAr ? "المستندات القانونية - أنشئ عقودك في دقائق" : "Legal Docs - Create Contracts in Minutes",
    },
    description: isAr
      ? "منصة احترافية لإنشاء المستندات القانونية المعتمدة. قوالب جاهزة، تعديل سهل، وتصدير فوري."
      : "Professional platform for creating legal documents. Ready templates, easy editing, instant export.",
    keywords: isAr
      ? ["مستندات قانونية", "عقود", "قوالب قانونية", "محاماة", "توقيع إلكتروني", "قانون"]
      : ["legal documents", "contracts", "legal templates", "lawyer", "e-signature", "legal tech"],
    authors: [{ name: isAr ? "فريق المستندات القانونية" : "Legal Docs Team" }],
    creator: "Legal Docs",
    publisher: "Legal Docs",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: "/ar",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      locale,
      siteName: isAr ? "المستندات القانونية" : "Legal Docs",
    },
    twitter: {
      card: "summary_large_image",
      site: "@legalDocs",
      creator: "@legalDocs",
    },
  };
}

export default async function Home({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  
  // ✅ تعريف السياق الصحيح لـ Schema
  const ctx = {
    locale: locale as "ar" | "en",
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    brandName: locale === "ar" ? "المستندات القانونية" : "Legal Docs",
    currency: "USD",
  };

  const { plans, faqItems } = await getSchemaData(locale);

  return (
    <>
      {/* ✅ Schema عام */}
      <JsonLd data={generateWebSiteSchema(ctx)} key="website" />
      <JsonLd data={generateSoftwareSchema(ctx)} key="software" />
      
      {/* ✅ Schema لكل خطة (شهري + سنوي) لأفضل تحسين لـ SEO */}
      {plans.map((plan, index) => {
        // ✅ توليد Schema للخطة الشهرية
        const monthlySchema = generateProductSchema(
          {
            name: plan.name,
            description: plan.description,
            priceSpec: {
              price: plan.price_monthly,
              priceCurrency: plan.currency,
              billingPeriod: "P1M" as const, // ✅ شهري
            },
            features: plan.features,
            isPopular: Boolean(plan.popular),
          },
          ctx
        );

        // ✅ توليد Schema للخطة السنوية (إذا كان السعر مختلف)
        const yearlySchema = generateProductSchema(
          {
            name: plan.name,
            description: plan.description,
            priceSpec: {
              price: plan.price_yearly,
              priceCurrency: plan.currency,
              billingPeriod: "P1Y" as const, // ✅ سنوي
            },
            features: plan.features,
            isPopular: Boolean(plan.popular),
          },
          ctx
        );

        return (
          <div key={`plan-${index}`}>
            <JsonLd key={`plan-${index}-monthly`} data={monthlySchema} />
            <JsonLd key={`plan-${index}-yearly`} data={yearlySchema} />
          </div>
        );
      })}
      
      {/* ✅ Schema للأسئلة الشائعة */}
      <JsonLd 
        data={generateFAQSchema(faqItems, ctx)} 
        key="faq" 
      />

      {/* باقي محتوى الصفحة */}
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}