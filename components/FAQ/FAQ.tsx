// components/sections/FAQ/FAQ.tsx
"use client";

import { useState, useLayoutEffect } from "react";
import Link from "next/link";
import styles from "./FAQ.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { FAQItem } from "./FAQItem";
import { FiMail, FiClock } from "react-icons/fi";

export function FAQ() {
  const { t, isLoaded } = useTranslation("faq");
  const [isMounted, setIsMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("general");
  const [openId, setOpenId] = useState<string | null>(null);

  useLayoutEffect(() => setIsMounted(true), []);

  if (!isLoaded || !isMounted) return <FAQSkeleton />;

  const categories = ["general", "pricing", "technical", "legal"];
  const items = t("items") as Array<{ id: string; category: string; question: string; answer: string }>;
  const filteredItems = items.filter((item) => item.category === activeCategory);

  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>
        {/* الهيدر */}
        <header className={styles.header}>
          <div className={styles.badge}>
            <span>💬</span> {String(t("badge"))}
          </div>
          
          <h2 className={styles.title}>
            {String(t("title")).split(/(<highlight>.*?<\/highlight>)/g).map((part: string, i: number) =>
              part.startsWith("<highlight>") ? (
                <span key={i} className={styles.highlight}>
                  {part.replace(/<\/?highlight>/g, "")}
                </span>
              ) : <span key={i}>{part}</span>
            )}
          </h2>
          
          <p className={styles.subtitle}>{String(t("subtitle"))}</p>
        </header>

        {/* تبويبات التصنيفات */}
        <div className={styles.tabs} role="tablist" aria-label="FAQ categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`${styles.tab} ${activeCategory === cat ? styles.active : ""}`}
              onClick={() => {
                setActiveCategory(cat);
                setOpenId(null); // إغلاق الأكورديون عند تغيير التصنيف
              }}
            >
              {String(t(`categories.${cat}`))}
            </button>
          ))}
        </div>

        {/* قائمة الأسئلة */}
        <div className={styles.list}>
          {filteredItems.map((item) => (
            <FAQItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>

        {/* CTA الدعم الفني */}
        <div className={styles.contactCta}>
          <p>{String(t("contact.text"))}</p>
          <Link href="/contact" className={styles.contactBtn}>
            <FiMail /> {String(t("contact.button"))}
          </Link>
          <span className={styles.responseTime}>
            <FiClock /> {String(t("contact.response_time"))}
          </span>
        </div>
      </div>
    </section>
  );
}

// Skeleton
function FAQSkeleton() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={`${styles.badge} ${styles.skeleton}`} style={{ width: "180px", height: "32px" }} />
          <div className={`${styles.skeleton}`} style={{ height: "40px", width: "80%", margin: "0 auto 1rem" }} />
          <div className={`${styles.skeleton}`} style={{ height: "18px", width: "60%", margin: "0 auto" }} />
        </header>
        <div className={styles.skeletonTabs}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`${styles.skeleton} ${styles.skeletonTab}`} />
          ))}
        </div>
        <div className={styles.skeletonList}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`${styles.skeleton} ${styles.skeletonItem}`} />
          ))}
        </div>
      </div>
    </section>
  );
}