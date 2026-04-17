// components/sections/Pricing/PricingToggle.tsx
"use client";

import styles from "./Pricing.module.css";

interface PricingToggleProps {
  isYearly: boolean;
  onChange: (value: boolean) => void;
}

export function PricingToggle({ isYearly, onChange }: PricingToggleProps) {
  return (
    <div className={styles.toggleWrapper}>
      <span className={`${styles.toggleLabel} ${!isYearly ? styles.active : ""}`}>
        شهري
      </span>
      
      <button
        className={styles.toggleSwitch}
        onClick={() => onChange(!isYearly)}
        aria-label="Toggle billing period"
        type="button"
      >
        <span className={styles.toggleKnob} style={{ transform: isYearly ? "translateX(24px)" : "translateX(0)" }} />
      </button>
      
      <span className={`${styles.toggleLabel} ${isYearly ? styles.active : ""}`}>
        سنوي
        <span className={styles.saveBadge}>وفر 20%</span>
      </span>
    </div>
  );
}