"use client";

import { useState } from "react";
import styles from "./Pricing.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { PricingToggle } from "./PricingToggle";
import { PricingCard } from "./PricingCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateProductSchema } from "@/lib/schema/generators";
import { FiChevronDown, FiShield, FiClock, FiDollarSign } from "react-icons/fi";
import { PricingPlan, PlanKey, SchemaContext } from "@/lib/schema/types";

type FAQItem = { q: string; a: string };

export function Pricing() {
  const { t, locale, isLoaded } = useTranslation("pricing");
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans: PlanKey[] = ["free", "basic", "pro"];

  // ✅ دالة بسيطة لجلب الخطة (بدون useCallback - Compiler يتكفل بالأداء)
  const getPricingPlan = (planKey: PlanKey): PricingPlan => {
    const rawPlan = t(`plans.${planKey}`);
    
    if (!rawPlan || typeof rawPlan !== 'object') {
      return {
        name: planKey,
        desc: '',
        price_monthly: "0",
        price_yearly: "0",
        currency: 'USD',
        period: '',
        features: [],
        popular: false,
        cta: ''
      };
    }
    
    const plan = rawPlan as PricingPlan;
    
    if (typeof plan.name !== 'string' || !Array.isArray(plan.features)) {
      console.warn(`Invalid plan data for ${planKey}`);
      return {
        name: planKey,
        desc: '',
        price_monthly: "0",
        price_yearly: "0",
        currency: 'USD',
        period: '',
        features: [],
        popular: false,
        cta: ''
      };
    }
    
    return plan;
  };

  // ✅ سياق الـ Schema (بدون useMemo)
  const schemaContext: SchemaContext = {
    locale: locale as "ar" | "en",
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    brandName: (t("plans.free.name") as string).includes("مجاني")
      ? "المستندات القانونية"
      : "Legal Docs",
    currency: "USD",
  };

  // ✅ توليد الـ Schema لكل الخطط (بدون useMemo)
  const pricingSchema = plans.map((planId) => {
    const plan = getPricingPlan(planId);
    return generateProductSchema(
      {
        name: plan.name,
        description: plan.desc,
        priceSpec: {
          price: isYearly ? plan.price_yearly : plan.price_monthly,
          priceCurrency: plan.currency,
          billingPeriod: isYearly ? "P1Y" : "P1M",
        },
        features: plan.features,
        isPopular: Boolean(plan.popular),
      },
      schemaContext,
    );
  });

  const rawTrustList = t("trust");
  const trustList = Array.isArray(rawTrustList) ? (rawTrustList as string[]) : [];

  const rawFaq = t("faq");
  const faqList = Array.isArray(rawFaq) ? (rawFaq as FAQItem[]) : [];

  // ✅ الاعتماد على isLoaded فقط (بدون isMounted)
  if (!isLoaded) {
    return <PricingSkeleton />;
  }

  return (
    <section className={styles.section} id="pricing">
      <div className={styles.background}>
        <div className={styles.gradientOrb} />
        <div className={styles.gridPattern} />
      </div>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.badge}>
            <span>💎</span> {t("badge") as string}
          </div>

          <h2 className={styles.title}>
            {(t("title") as string)
              .split(/(<highlight>.*?<\/highlight>)/g)
              .map((part: string, i: number) =>
                part.startsWith("<highlight>") ? (
                  <span key={i} className={styles.highlight}>
                    {part.replace(/<\/?highlight>/g, "")}
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                ),
              )}
          </h2>

          <p className={styles.subtitle}>{t("subtitle") as string}</p>
        </header>

        <div className={styles.toggleContainer}>
          <PricingToggle isYearly={isYearly} onChange={setIsYearly} />
        </div>

        <div className={styles.cardsGrid}>
          {plans.map((planKey, index) => {
            const plan = getPricingPlan(planKey);
            return (
              <PricingCard
                key={planKey}
                plan={plan}
                isYearly={isYearly}
                index={index}
              />
            );
          })}
        </div>

        <div className={styles.trustBadges}>
          {trustList.map((badge: string, i: number) => (
            <div key={i} className={styles.trustItem}>
              {i === 0 && <FiShield className={styles.trustIcon} />}
              {i === 1 && <FiClock className={styles.trustIcon} />}
              {i === 2 && <FiDollarSign className={styles.trustIcon} />}
              <span>{badge}</span>
            </div>
          ))}
        </div>

        <div className={styles.faqSection}>
          <h3 className={styles.faqTitle}>{t("faq_title") as string}</h3>

          <div className={styles.faqList}>
            {faqList.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                >
                  <span>{faq.q}</span>
                  <FiChevronDown
                    className={`${styles.faqIcon} ${openFaq === index ? styles.open : ""}`}
                  />
                </button>

                <div
                  className={`${styles.faqAnswer} ${openFaq === index ? styles.show : ""}`}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.finalCta}>
          <p>لست متأكداً أي خطة تختار؟</p>
          <a href="/contact" className={styles.helpLink}>
            تواصل معنا لمساعدتك في الاختيار المناسب ←
          </a>
        </div>
      </div>

      {/* ✅ حقن الـ Schema في الـ head */}
      {pricingSchema.map((schema, i) => (
        <JsonLd key={`dynamic-plan-${i}`} data={schema} />
      ))}
    </section>
  );
}

function PricingSkeleton() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={`${styles.badge} ${styles.skeleton}`} style={{ width: "180px", height: "32px" }} />
          <div className={`${styles.skeleton}`} style={{ height: "40px", width: "80%", margin: "0 auto 1rem" }} />
          <div className={`${styles.skeleton}`} style={{ height: "18px", width: "60%", margin: "0 auto" }} />
        </header>

        <div className={`${styles.skeleton}`} style={{ height: "48px", width: "280px", margin: "0 auto 3rem" }} />

        <div className={styles.skeletonGrid}>
          {[0, 1, 2].map((i) => (
            <div key={i} className={`${styles.card} ${styles.skeletonCard}`}>
              <div className={styles.skeletonPriceBox}>
                <div className={styles.skeletonLine} style={{ width: "60%", height: "24px" }} />
                <div className={styles.skeletonLine} style={{ width: "40%", height: "48px" }} />
                <div className={styles.skeletonLine} style={{ width: "50%", height: "16px" }} />
              </div>
              <div className={`${styles.skeleton}`} style={{ height: "48px", borderRadius: "12px" }} />
              <div className={styles.skeletonFeatures}>
                {[...Array(6)].map((_, j) => (
                  <div key={j} className={styles.skeletonFeature} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}