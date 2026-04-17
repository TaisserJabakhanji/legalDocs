// components/sections/Features/FeatureCard.tsx
"use client";

import React from "react";
import styles from "./Features.module.css";
import { FiShield, FiZap, FiCheckCircle, FiCloud, FiFileText, FiHeadphones } from "react-icons/fi";

const iconMap: Record<string, React.ReactNode> = {
  shield: <FiShield />,
  zap: <FiZap />,
  "check-circle": <FiCheckCircle />,
  cloud: <FiCloud />,
  "file-text": <FiFileText />,
  headphones: <FiHeadphones />,
};

interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
  index: number;
}

export function FeatureCard({ icon, title, desc, index }: FeatureCardProps) {
  const Icon = iconMap[icon] || <FiShield />;

  return (
    <article 
      className={styles.card}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={styles.iconBox}>{Icon}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{desc}</p>
    </article>
  );
}