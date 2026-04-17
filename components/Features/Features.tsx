// components/sections/Features/Features.tsx
"use client";

import styles from "./Features.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { FeatureCard } from "./FeatureCard";

export function Features() {
  const { t, isLoaded } = useTranslation("features");

  // ✅ عرض Skeleton أثناء تحميل الترجمات
  if (!isLoaded) {
    return <FeaturesSkeleton />;
  }

  return (
    <section className={styles.section} id="features">
      {/* خلفية زخرفية */}
      <div className={styles.bgOrb} />
      
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.badge}>
            {/* ✅ الحل: إضافة as string لأن التوكن يُرجع unknown */}
            <span>🚀</span> {t("badge") as string}
          </div>
          
          <h2 className={styles.title}>
            {/* ✅ تحويل النتيجة لنص قبل التعامل معها */}
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

        <div className={styles.grid}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <FeatureCard
              key={i}
              // ✅ إضافة as string لكل النصوص المعروضة
              icon={t(`features.${i}.icon`) as string}
              title={t(`features.${i}.title`) as string}
              desc={t(`features.${i}.desc`) as string}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ✅ Skeleton مدمج لتبسيط الملفات
function FeaturesSkeleton() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={`${styles.badge} ${styles.skeleton}`} style={{ width: "140px", height: "32px" }} />
          <div className={`${styles.skeleton}`} style={{ height: "40px", width: "80%", margin: "0 auto 1rem" }} />
          <div className={`${styles.skeleton}`} style={{ height: "18px", width: "60%", margin: "0 auto" }} />
        </header>
        <div className={styles.skeletonGrid}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={styles.skeletonCard}>
              <div className={styles.skeletonIcon} />
              <div className={styles.skeletonLine} style={{ width: "90%" }} />
              <div className={styles.skeletonLineShort} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}