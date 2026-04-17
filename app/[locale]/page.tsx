// app/[locale]/page.tsx
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { HowItWorks } from "@/components/HowItWorks";
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

// ... باقي الـ imports ...

// دالة مساعدة لجلب بيانات الـ Schema
async function getSchemaData(locale: string) {
  const isAr = locale === "ar";
  
  const plans = [
    {
      name: isAr ? "مجاني" : "Free",
      description: isAr ? "مثالي للتجربة" : "Perfect for trying out",
      priceSpec: { price: "0", priceCurrency: "USD" },
      features: isAr ? ["3 مستندات شهرياً", "تصدير PDF"] : ["3 docs/month", "PDF export"],
    },
    {
      name: isAr ? "أساسي" : "Basic",
      description: isAr ? "للمحترفين" : "For professionals",
      priceSpec: { price: "6.99", priceCurrency: "USD", billingPeriod: "P1M" },
      features: isAr ? ["30 مستند شهرياً", "دعم عبر الدردشة"] : ["30 docs/month", "Live chat"],
    },
    {
      name: isAr ? "محترف" : "Pro",
      description: isAr ? "للفرق والشركات" : "For teams and businesses",
      priceSpec: { price: "19.99", priceCurrency: "USD", billingPeriod: "P1M" },
      features: isAr ? ["مستندات غير محدودة", "🤖 خبير قانوني ذكي"] : ["Unlimited docs", "🤖 AI Legal Expert"],
      isPopular: true,
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

export default async function Home({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  
  // ✅ 1. تعريف السياق الصحيح (4 خصائص فقط)
  const ctx = {
    locale: locale as "ar" | "en",
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    brandName: locale === "ar" ? "المستندات القانونية" : "Legal Docs",
    currency: "USD", // ✅ ضروري جداً
  };

  // ✅ 2. جلب البيانات بشكل منفصل
  const { plans, faqItems } = await getSchemaData(locale);

  return (
    <>
      {/* ✅ Schema عام */}
      <JsonLd data={generateWebSiteSchema(ctx)} key="website" />
      <JsonLd data={generateSoftwareSchema(ctx)} key="software" />
      
      {/* ✅ Schema لكل خطة */}
      {plans.map((plan, index) => (
        <JsonLd
          key={`plan-${index}`}
          data={generateProductSchema(plan, ctx)} // ✅ ctx منفصل عن plan
        />
      ))}
      
      {/* ✅ Schema للأسئلة الشائعة */}
      <JsonLd 
        data={generateFAQSchema(faqItems, ctx)} 
        key="faq" 
      />

      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}