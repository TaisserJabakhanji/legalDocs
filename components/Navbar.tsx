// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "./Navbar.module.css";
import { FiMenu, FiX, FiGlobe } from "react-icons/fi";
import { useState, useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import { useTranslation } from "@/hooks/useTranslation";

// ✅ تعريف الروابط خارج الكومبوننت (أفضل للأداء)
const NAV_LINKS = [
  { key: "links.templates", href: "/templates" },
  { key: "links.pricing", href: "/pricing" },
  { key: "links.about", href: "/about" },
] as const;

export function Navbar() {
  const { t, locale, isLoaded, changeLanguage } = useTranslation("navbar");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);

  // ✅ ضبط اتجاه الصفحة
  useEffect(() => {
    const html = document.documentElement;
    const dir = locale === "ar" ? "rtl" : "ltr";
    if (html.lang !== locale) html.lang = locale || "ar";
    if (html.dir !== dir) html.dir = dir;
  }, [locale]);

  // ✅ إغلاق المنيو عند النقر خارجه
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          {/* ✅ الحل: إضافة as string لأن t() تُرجع unknown */}
          {isLoaded ? (t("title") as string) : "..."}
        </Link>
        
        <ul className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link.key}>
              <Link href={link.href}>
                {isLoaded ? (t(link.key) as string) : "..."}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button
            onClick={() => changeLanguage(locale === "ar" ? "en" : "ar")}
            className={styles.langToggle}
            aria-label="Switch language"
          >
            <FiGlobe size={18} />
            <span className={styles.langLabel}>{locale === "ar" ? "En" : "Ar"}</span>
          </button>

          <div className={styles.themeIcon}>
            <ThemeToggle />
          </div>
          
          <button className={styles.loginButton}>
            {isLoaded ? (t("cta") as string) : "..."}
          </button>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className={styles.mobileNavbar}>
        <Link href="/" className={styles.logo}>
          {isLoaded ? (t("title") as string) : "..."}
        </Link>
        
        {isMobileMenuOpen ? (
          <FiX size={24} onClick={toggleMenu} className="cursor-pointer" />
        ) : (
          <FiMenu size={24} onClick={toggleMenu} className="cursor-pointer" />
        )}
      </nav>

      {/* Mobile Menu */}
      <ul
        ref={menuRef}
        className={`${styles.mobileNavLinks} ${isMobileMenuOpen ? styles.open : ""}`}
      >
        <li className={styles.mobileAction}>
          <button
            onClick={() => {
              changeLanguage(locale === "ar" ? "en" : "ar");
              setIsMobileMenuOpen(false);
            }}
            className={styles.langToggleMobile}
          >
            <FiGlobe /> {locale === "ar" ? "En" : "Ar"}
          </button>
        </li>
        
        <ThemeToggle />
        
        {NAV_LINKS.map((link) => (
          <li key={link.key}>
            <Link href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
              {isLoaded ? (t(link.key) as string) : "..."}
            </Link>
          </li>
        ))}
        
        <button className={styles.loginButton} onClick={() => setIsMobileMenuOpen(false)}>
          {isLoaded ? (t("cta") as string) : "..."}
        </button>
      </ul>
    </>
  );
}