// components/sections/HowItWorks/HowItWorks.tsx
"use client";

import Link from "next/link";
import styles from "./HowItWorks.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { StepCard } from "./StepCard";
import { FiArrowRight } from "react-icons/fi";
import { HowItWorksSkeleton } from "./HowItWorksSkeleton";

export function HowItWorks() {
  const { t, locale, isLoaded } = useTranslation("how-it-works");

  if (!isLoaded) {
    return <HowItWorksSkeleton />;
  }

  return (
    <section className={styles.section} id="how-it-works">
      {/* خلفية زخرفية */}
      <div className={styles.background}>
        <div className={styles.gradientOrb} />
        <div className={styles.gridPattern} />
      </div>

      <div className={styles.container}>
        {/* الهيدر */}
        <header className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>✨</span>
            {t("badge")}
          </div>
          
          <h2 className={styles.title}>
            {t("title").split(/(<highlight>.*?<\/highlight>)/g).map((part, i) => {
              if (part.startsWith("<highlight>")) {
                return (
                  <span key={i} className={styles.highlight}>
                    {part.replace(/<\/?highlight>/g, "")}
                  </span>
                );
              }
              return <span key={i}>{part}</span>;
            })}
          </h2>
          
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </header>

        {/* خطوات العمل */}
        <div className={styles.stepsGrid}>
          {[0, 1, 2].map((index) => {
            const stepData = {
              step: t(`steps.${index}.step`),
              icon: t(`steps.${index}.icon`),
              title: t(`steps.${index}.title`),
              description: t(`steps.${index}.desc`),
              features: [
                t(`steps.${index}.features.0`),
                t(`steps.${index}.features.1`),
                t(`steps.${index}.features.2`),
              ],
              index,
            };
            return <StepCard key={index} {...stepData} />;
          })}
        </div>

        {/* زر الدعوة للإجراء + شارة الثقة */}
        <div className={styles.footer}>
          <Link href="/signup" className={styles.ctaButton}>
            {t("cta")}
            <FiArrowRight className={styles.ctaIcon} />
          </Link>
          
          <p className={styles.trustBadge}>
            <span className={styles.trustIcon}>🛡️</span>
            {t("trust_badge")}
          </p>
        </div>
      </div>
    </section>
  );
}