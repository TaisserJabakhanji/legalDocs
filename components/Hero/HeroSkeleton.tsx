// components/HeroSkeleton.tsx
import styles from "./Hero.module.css";

export function HeroSkeleton() {
  return (
    <section className={styles.hero}>
      <div className={styles.skeleton}>
        <div className={styles.skeletonBadge} />
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonSubtitle} />
        <div className={styles.skeletonActions}>
          <div />
          <div />
        </div>
        <div className={styles.skeletonFeatures}>
          <div /><div /><div /><div />
        </div>
        <div className={styles.skeletonStats}>
          <div /><div /><div />
        </div>
      </div>
    </section>
  );
}