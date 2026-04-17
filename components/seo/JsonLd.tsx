// components/seo/JsonLd.tsx
"use client";

import { useEffect } from "react";

interface JsonLdProps {
  data: Record<string, string | number | boolean | object | null>;
  key?: string;
}

export function JsonLd({ data, key = "jsonld" }: JsonLdProps) {
  useEffect(() => {
    // إنشاء عنصر script وإضافته للـ head
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = key;
    script.textContent = JSON.stringify(data);
    
    // إزالة أي عنصر سابق بنفس الـ ID لتجنب التكرار
    const existing = document.getElementById(key);
    if (existing) existing.remove();
    
    document.head.appendChild(script);
    
    // تنظيف عند إزالة المكون
    return () => {
      const el = document.getElementById(key);
      if (el) el.remove();
    };
  }, [data, key]);

  return null; // لا يُرندر أي UI مرئي
}