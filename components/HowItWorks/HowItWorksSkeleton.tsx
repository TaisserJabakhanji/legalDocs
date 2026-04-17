// components/sections/HowItWorks/HowItWorksSkeleton.tsx
import styles from "./HowItWorks.module.css";

export function HowItWorksSkeleton() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* هيدر هيكل */}
        <header className={styles.header}>
          <div className={`${styles.badge} ${styles.skeleton}`} />
          <div className={`${styles.title} ${styles.skeleton}`} style={{ height: "48px", width: "80%" }} />
          <div className={`${styles.subtitle} ${styles.skeleton}`} style={{ height: "20px", width: "70%" }} />
        </header>

        {/* بطاقات هيكل */}
        <div className={styles.stepsGrid}>
          {[0, 1, 2].map((i) => (
            <article key={i} className={`${styles.stepCard} ${styles.skeletonCard}`}>
              <div className={styles.skeletonStepNumber} />
              <div className={styles.skeletonIcon} />
              <div className={styles.skeletonContent}>
                <div className={styles.skeletonLine} style={{ width: "90%" }} />
                <div className={styles.skeletonLine} style={{ width: "100%" }} />
                <div className={styles.skeletonLine} style={{ width: "85%" }} />
                <ul className={styles.skeletonFeatures}>
                  <li><div className={styles.skeletonFeature} /></li>
                  <li><div className={styles.skeletonFeature} /></li>
                  <li><div className={styles.skeletonFeature} /></li>
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* فوتر هيكل */}
        <div className={styles.footer}>
          <div className={`${styles.ctaButton} ${styles.skeleton}`} style={{ width: "200px", height: "52px" }} />
          <div className={`${styles.trustBadge} ${styles.skeleton}`} style={{ width: "250px", height: "24px" }} />
        </div>
      </div>
    </section>
  );
}