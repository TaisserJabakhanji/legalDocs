// components/sections/HowItWorks/StepCard.tsx
"use client";

import { ReactNode } from "react";
import styles from "./HowItWorks.module.css";
import { FiSearch, FiEdit3, FiDownload, FiCheck } from "react-icons/fi";

const iconMap: Record<string, ReactNode> = {
  search: <FiSearch />,
  edit: <FiEdit3 />,
  download: <FiDownload />,
};

interface StepCardProps {
  step: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  index: number;
}

export function StepCard({ step, icon, title, description, features, index }: StepCardProps) {
  const IconComponent = iconMap[icon] || <FiSearch />;

  return (
    <article 
      className={styles.stepCard}
      style={{ animationDelay: `${index * 0.15}s` }}
      data-step={step}
    >
      {/* رقم الخطوة العائم */}
      <div className={styles.stepNumber}>
        <span>{step}</span>
      </div>

      {/* أيقونة الخطوة */}
      <div className={styles.iconWrapper}>
        <div className={styles.iconBackground}>
          {IconComponent}
        </div>
      </div>

      {/* المحتوى */}
      <div className={styles.content}>
        <h3 className={styles.stepTitle}>{title}</h3>
        <p className={styles.stepDesc}>{description}</p>

        {/* الميزات الفرعية */}
        <ul className={styles.featureList}>
          {features.map((feature, i) => (
            <li key={i} className={styles.featureItem}>
              <FiCheck className={styles.featureCheck} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* خط التوصيل (للتصميم) */}
      <div className={styles.connector} aria-hidden="true" />
    </article>
  );
}