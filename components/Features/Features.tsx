// components/sections/Features/Features.tsx
"use client";

import styles from "./Features.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { FeatureCard } from "./FeatureCard";

export function Features() {
  const { t, isLoaded } = useTranslation("features");

  if (!isLoaded) {
    return <FeaturesSkeleton />;
  }

  return (
    <section className={styles.section} id="features">
      <div className={styles.bgOrb} />
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.badge}>
            <span>🚀</span> {t("badge")}
          </div>
          
          <h2 className={styles.title}>
            {t("title").split(/(<highlight>.*?<\/highlight>)/g).map((part, i) =>
              part.startsWith("<highlight>") ? (
                <span key={i} className={styles.highlight}>
                  {part.replace(/<\/?highlight>/g, "")}
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </h2>
          
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </header>

        <div className={styles.grid}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <FeatureCard
              key={i}
              icon={t(`features.${i}.icon`)}
              title={t(`features.${i}.title`)}
              desc={t(`features.${i}.desc`)}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Skeleton مدمج لتبسيط الملفات
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