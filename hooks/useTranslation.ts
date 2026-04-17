"use client";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";

const i18nCache: Record<string, Record<string, unknown>> = {};

export function useTranslation(...sections: string[]) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // ✅ استخراج اللغة من params (في Client Components يعود كـ object عادي)
  const locale = (params?.locale as string) || "ar";

  const [translations, setTranslations] = useState<Record<string, Record<string, unknown>>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const sectionsKey = sections.join(",");
  const isFetchingRef = useRef(false);

  useEffect(() => {
    if (!locale) return;
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    async function loadTranslations() {
      const merged: Record<string, Record<string, unknown>> = {};

      for (const sec of sections) {
        const cacheKey = `${locale}-${sec}`;

        if (i18nCache[cacheKey]) {
          merged[sec] = i18nCache[cacheKey];
          continue;
        }

        try {
          const res = await fetch(`/locales/${locale}/${sec}.json`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          i18nCache[cacheKey] = data;
          merged[sec] = data;
        } catch (error) {
          console.error(`❌ Failed to load ${locale}/${sec}.json`, error);
          merged[sec] = {};
        }
      }

      setTranslations((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(merged)) return prev;
        return { ...prev, ...merged };
      });

      if (!isLoaded) setIsLoaded(true);
      isFetchingRef.current = false;
    }

    loadTranslations();
    return () => {
      isFetchingRef.current = false;
    };
  }, [locale, sectionsKey, isLoaded, sections]);


  // 🔍 ابحث عن دالة t داخل hooks/useTranslation.ts واستبدلها بهذا:

const t = useCallback((key: string): string | Record<string, unknown> | unknown[] | unknown => {
  for (const sec of sections) {
    const sectionData = translations[sec];
    if (!sectionData) continue;

    const keys = key.split(".");
    let value: unknown = sectionData;
    
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        value = undefined;
        break;
      }
    }
    
    // ✅ يرجع القيمة كما هي سواء كانت string, array, أو object
    if (value !== undefined && value !== null) return value;
  }
  return key;
}, [translations, sectionsKey, sections]);
  // const t = useCallback(
  //   (key: string): string => {
  //     for (const sec of sections) {
  //       const sectionData = translations[sec];
  //       if (!sectionData) continue;

  //       const keys = key.split(".");
  //       let value: unknown = sectionData;

  //       for (const k of keys) {
  //         if (value && typeof value === "object" && k in value) {
  //           value = (value as Record<string, unknown>)[k];
  //         } else {
  //           value = undefined;
  //           break;
  //         }
  //       }

  //       if (typeof value === "string") return value;
  //     }
  //     return key;
  //   },
  //   [translations, sectionsKey, sections],
  // );

  // ✅ ✅ ✅ الدالة المُصححة لتبديل اللغة
  const changeLanguage = useCallback(
    (newLocale: string) => {
      const cleanPath = pathname.replace(/^\/(ar|en)(\/|$)/, "/");
      const newPath = `/${newLocale}${cleanPath === "/" ? "" : cleanPath}`;
      router.push(newPath);
    },
    [pathname, router],
  );

  return { t, locale, isLoaded, changeLanguage };
}
