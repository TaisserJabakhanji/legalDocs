// components/Hero.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Hero.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { FiPlay, FiCheck, FiArrowRight } from "react-icons/fi";
import { VideoModal } from "./VideoModal";
import { HeroSkeleton } from "./HeroSkeleton";

export function Hero() {
  const { t, locale, isLoaded } = useTranslation("hero");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  if (!isLoaded) {
    return <HeroSkeleton />;
  }

  // ✅ معالجة العنوان مع دعم <highlight>
  const renderTitle = (text: string) => {
    const parts = text.split(/(<highlight>.*?<\/highlight>)/g);
    return parts.map((part, i) => {
      if (part.startsWith("<highlight>")) {
        const content = part.replace(/<\/?highlight>/g, "");
        return (
          <span key={i} className={styles.highlight}>
            {content}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      <section className={styles.hero}>
        {/* خلفية متحركة */}
        <div className={styles.background}>
          <div className={styles.blob} />
          <div className={styles.blob} style={{ animationDelay: "-2s" }} />
          <div className={styles.grid} />
        </div>

        <div className={styles.container}>
          {/* الشعار العلوي */}
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>✨</span>
            {t("badge")}
          </div>

          {/* العنوان الرئيسي */}
          <h1 className={styles.title}>
            {renderTitle(t("title"))}
          </h1>

          {/* الوصف */}
          <p className={styles.subtitle}>
            {t("subtitle")}
          </p>

          {/* أزرار الدعوة للإجراء */}
          <div className={styles.actions}>
            <Link href="/signup" className={styles.btnPrimary}>
              {t("cta_primary")}
              <FiArrowRight className={styles.btnIcon} />
            </Link>
            
            <button 
              onClick={() => setIsVideoModalOpen(true)}
              className={styles.btnSecondary}
            >
              <FiPlay className={styles.playIcon} />
              {t("cta_secondary")}
            </button>
          </div>

          {/* ميزات سريعة */}
          <ul className={styles.features}>
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className={styles.feature}>
                <FiCheck className={styles.featureIcon} />
                <span>{t(`features.${i}`)}</span>
              </li>
            ))}
          </ul>

          {/* إحصائيات الثقة */}
          <div className={styles.trust}>
            <span className={styles.trustText}>{t("trust")}</span>
            <div className={styles.stats}>
              {["templates", "users", "rating"].map((key) => (
                <div key={key} className={styles.stat}>
                  <span className={styles.statValue}>
                    {t(`stats.${key}.value`)}
                  </span>
                  <span className={styles.statLabel}>
                    {t(`stats.${key}.label`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* صورة توضيحية */}
          <div className={styles.visual}>
            <div className={styles.cardPreview}>
              <div className={styles.cardHeader}>
                <div className={styles.cardDots}>
                  <span />
                  <span />
                  <span />
                </div>
                <span className={styles.cardTitle}>contract.pdf</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardLine} style={{ width: "90%" }} />
                <div className={styles.cardLine} style={{ width: "75%" }} />
                <div className={styles.cardLine} style={{ width: "85%" }} />
                <div className={styles.cardLine} style={{ width: "60%" }} />
                <div className={styles.cardSignature} />
              </div>
            </div>
            
            {/* عناصر عائمة */}
            <div className={styles.floatingBadge} style={{ top: "10%", right: "5%" }}>
              <FiCheck /> PDF Ready
            </div>
            <div className={styles.floatingBadge} style={{ bottom: "15%", left: "10%" }}>
              ⚡ Instant Export
            </div>
          </div>
        </div>

        {/* مؤشر التمرير */}
        <div className={styles.scrollIndicator}>
          <span className={styles.scrollText}>Scroll</span>
          <div className={styles.scrollMouse}>
            <div className={styles.scrollWheel} />
          </div>
        </div>
      </section>

      {/* مودال الفيديو */}
      {isVideoModalOpen && (
        <VideoModal 
          title={t("video.title")}
          onClose={() => setIsVideoModalOpen(false)}
        />
      )}
    </>
  );
}