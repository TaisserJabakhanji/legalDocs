// components/sections/Footer/Footer.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import {
  FiTwitter,
  FiLinkedin,
  FiGithub,
  FiYoutube,
  FiArrowUp,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiMail,
} from "react-icons/fi";

const socialIcons: Record<string, React.ReactNode> = {
  twitter: <FiTwitter />,
  linkedin: <FiLinkedin />,
  github: <FiGithub />,
  youtube: <FiYoutube />,
};

export function Footer() {
  const { t, isLoaded } = useTranslation("footer");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  if (!isLoaded) return <FooterSkeleton />;

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 🔍 تحقق بسيط (يمكن استبداله بـ API حقيقي لاحقاً)
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const currentYear = new Date().getFullYear();

  const copyrightText = (t("copyright") as string)
    .replace("{year}", String(currentYear))
    .replace("{brand}", t("brand") as string);

  const columns = t("columns") as Array<{
    title: string;
    links: Array<{ label: string; href: string }>;
  }>;
  const socials = t("socials") as Array<{
    platform: string;
    url: string;
    label: string;
  }>;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* القسم العلوي: النشرة البريدية + الأعمدة */}
        <div className={styles.grid}>
          {/* العمود الأول: العلامة + الوصف + النشرة */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brand}>
              {t("brand") as string}
            </Link>
            <p className={styles.brandDesc}>{t("description") as string}</p>

            <form onSubmit={handleSubscribe} className={styles.newsletter}>
              <label htmlFor="newsletter-email" className="sr-only">
                {t("newsletter.placeholder") as string}
              </label>
              <div className={styles.inputWrapper}>
                <FiMail className={styles.inputIcon} />
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder={t("newsletter.placeholder") as string}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                  aria-label={t("newsletter.placeholder") as string}
                />
                <button
                  type="submit"
                  className={styles.submitBtn}
                  aria-label={t("newsletter.button") as string}
                >
                  <FiSend />
                </button>
              </div>
              {status !== "idle" && (
                <p className={`${styles.statusMsg} ${styles[status]}`}>
                  {status === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
                  {status === "success"
                    ? (t("newsletter.success") as string)
                    : (t("newsletter.error") as string)}
                </p>
              )}
            </form>
          </div>

          {/* الأعمدة الأخرى: الروابط */}
          {columns.map((col, i) => (
            <nav key={i} className={styles.linkCol} aria-label={col.title}>
              <h3 className={styles.colTitle}>{col.title}</h3>
              <ul className={styles.linkList}>
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* الخط الفاصل */}
        <hr className={styles.divider} />

        {/* القسم السفلي: الحقوق + التواصل + العودة للأعلى */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>{copyrightText}</p>

          <div className={styles.socials}>
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={social.label}
              >
                {socialIcons[social.platform] || null}
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className={styles.backToTop}
            aria-label={t("back_to_top") as string}
          >
            <FiArrowUp />
            <span className={styles.backText}>{t("back_to_top") as string}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

// Skeleton بسيط
function FooterSkeleton() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.skeletonGrid}>
          <div className={styles.skeletonCol}>
            <div className={`${styles.skeleton} ${styles.skeletonBrand}`} />
            <div className={`${styles.skeleton} ${styles.skeletonDesc}`} />
            <div className={`${styles.skeleton} ${styles.skeletonInput}`} />
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className={styles.skeletonCol}>
              <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
              {[...Array(4)].map((_, j) => (
                <div
                  key={j}
                  className={`${styles.skeleton} ${styles.skeletonLink}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className={styles.skeletonDivider} />
        <div className={styles.skeletonBottom}>
          <div className={`${styles.skeleton} ${styles.skeletonCopyright}`} />
          <div className={styles.skeletonSocials}>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`${styles.skeleton} ${styles.skeletonIcon}`}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
