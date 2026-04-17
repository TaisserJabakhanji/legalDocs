// components/sections/HowItWorks/HowItWorks.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./HowItWorks.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { StepCard } from "./StepCard";
import { FiArrowRight } from "react-icons/fi";
import { HowItWorksSkeleton } from "./HowItWorksSkeleton";

export function HowItWorks() {
  const { t, locale, isLoaded } = useTranslation("how-it-works");
  const [isMounted, setIsMounted] = useState(false);

  // ✅ الاعتماد على isLoaded فقط (بدون isMounted)
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
            {/* ✅ الحل: إضافة as string لأن t() تُرجع unknown */}
            {t("badge") as string}
          </div>
          
          <h2 className={styles.title}>
            {/* ✅ تحويل النتيجة لنص قبل التعامل معها */}
            {(t("title") as string).split(/(<highlight>.*?<\/highlight>)/g).map((part: string, i: number) =>
              part.startsWith("<highlight>") ? (
                <span key={i} className={styles.highlight}>
                  {part.replace(/<\/?highlight>/g, "")}
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </h2>
          
          <p className={styles.subtitle}>{t("subtitle") as string}</p>
        </header>

        {/* خطوات العمل */}
        <div className={styles.stepsGrid}>
          {[0, 1, 2].map((index) => {
            const stepData = {
              step: t(`steps.${index}.step`) as string,
              icon: t(`steps.${index}.icon`) as string,
              title: t(`steps.${index}.title`) as string,
              description: t(`steps.${index}.desc`) as string,
              features: [
                t(`steps.${index}.features.0`) as string,
                t(`steps.${index}.features.1`) as string,
                t(`steps.${index}.features.2`) as string,
              ],
              index,
            };
            return <StepCard key={index} {...stepData} />;
          })}
        </div>

        {/* زر الدعوة للإجراء + شارة الثقة */}
        <div className={styles.footer}>
          <Link href="/signup" className={styles.ctaButton}>
            {t("cta") as string}
            <FiArrowRight className={styles.ctaIcon} />
          </Link>
          
          <p className={styles.trustBadge}>
            <span className={styles.trustIcon}>🛡️</span>
            {t("trust_badge") as string}
          </p>
        </div>
      </div>
    </section>
  );
}