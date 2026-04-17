// components/sections/Pricing/PricingCard.tsx
"use client";

import Link from "next/link";
import styles from "./Pricing.module.css";
import { FiCheck, FiX, FiStar, FiZap } from "react-icons/fi";

import { PricingPlan } from "@/lib/schema/types";

interface PlanData {
  name: string;
  desc: string;
  price_monthly: string | number;
  price_yearly: string | number;
  currency: string;
  period?: string;
  cta?: string;
  popular?: boolean;
  features: string[];
  limitations?: string[];
}

interface PricingCardProps {
  plan: PlanData;
  isYearly: boolean;
  index: number;
}

export function PricingCard({ plan, isYearly, index }: PricingCardProps) {
  const price = isYearly ? plan.price_yearly : plan.price_monthly;
  const displayPrice = price === "0" ? "مجاني" : `$${price}`;

  return (
    <article 
      className={`${styles.card} ${plan.popular ? styles.popular : ""}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      data-plan={plan.name.toLowerCase()}
    >
      {/* شارة "الأكثر شعبية" */}
      {plan.popular && (
        <div className={styles.popularBadge}>
          <FiStar className={styles.popularIcon} />
          <span>الأكثر اختياراً</span>
        </div>
      )}

      {/* رأس البطاقة */}
      <header className={styles.cardHeader}>
        <h3 className={styles.planName}>{plan.name}</h3>
        <p className={styles.planDesc}>{plan.desc}</p>
        
        <div className={styles.priceBox}>
          <span className={styles.currency}>{plan.currency === "USD" ? "$" : ""}</span>
          <span className={styles.price}>{displayPrice}</span>
          <span className={styles.period}>{plan.period}</span>
        </div>

        {isYearly && plan.price_yearly !== "0" && (
          <span className={styles.yearlyDiscount}>
            <FiZap size={14} />
            توفر ${(Number(plan.price_monthly) - Number(plan.price_yearly)).toFixed(2)} شهرياً
          </span>
        )}
      </header>

      {/* زر الدعوة للإجراء */}
      <Link href={`/signup?plan=${plan.name.toLowerCase()}`} className={styles.ctaButton}>
        {plan.cta}
      </Link>

      {/* قائمة الميزات */}
      <ul className={styles.featureList}>
        {plan.features.map((feature, i) => (
          <li key={i} className={styles.featureItem}>
            <FiCheck className={styles.featureCheck} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* القيود (لخطة المجاني فقط) */}
{(plan.limitations && plan.limitations.length > 0) && (
        <ul className={styles.limitationList}>
          {plan.limitations.map((limit, i) => (
            <li key={i} className={styles.limitationItem}>
              <FiX className={styles.limitationIcon} />
              <span>{limit}</span>
            </li>
          ))}
        </ul>
      )}

      {/* ضمان الثقة */}
      <div className={styles.trustNote}>
        <FiCheck className={styles.trustIcon} />
        <span>ضمان استرداد الأموال 30 يوماً</span>
      </div>
    </article>
  );
}