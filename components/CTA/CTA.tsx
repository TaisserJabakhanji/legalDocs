// components/sections/CTA/CTA.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./CTA.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { FiArrowRight, FiMessageCircle } from "react-icons/fi";

export function CTA() {
  const { t, isLoaded } = useTranslation("cta");
  const [isMounted, setIsMounted] = useState(true);

  // Skeleton أثناء التحميل
  if (!isLoaded || !isMounted) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
          <div className={`${styles.skeleton} ${styles.skeletonSubtitle}`} />
          <div className={styles.skeletonButtons}>
            <div className={`${styles.skeleton} ${styles.skeletonBtn}`} />
            <div className={`${styles.skeleton} ${styles.skeletonBtn}`} />
          </div>
          <div className={styles.skeletonTrust}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`${styles.skeleton} ${styles.skeletonBadge}`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const trustList = t("trust") as string[];

  return (
    <section className={styles.section} id="cta">
      {/* خلفية متحركة */}
      <div className={styles.background}>
        <div className={styles.orb} />
        <div className={styles.orb} style={{ right: "auto", left: "-10%" }} />
        <div className={styles.grid} />
      </div>

      <div className={styles.container}>
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

        <div className={styles.actions}>
          <Link href="/signup" className={styles.btnPrimary}>
            {t("primary_btn") as string}
            <FiArrowRight className={styles.icon} />
          </Link>
          <Link href="/contact" className={styles.btnSecondary}>
            <FiMessageCircle className={styles.icon} />
            {t("secondary_btn") as string}
          </Link>
        </div>

        {/* شارات الثقة */}
        <div className={styles.trustBadges}>
          {Array.isArray(trustList) &&
            trustList.map((badge, i) => (
              <span key={i} className={styles.badge}>
                {badge}
              </span>
            ))}
        </div>
      </div>
    </section>
  );
}
