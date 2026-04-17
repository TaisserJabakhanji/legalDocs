// components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { useState, useLayoutEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // ✅ استخدام useLayoutEffect لمنع التحذير وإصلاح الـ Hydration
  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ أثناء الـ SSR أو قبل الـ mount: نعرض زرًا محايدًا بنفس الأبعاد
  if (!isMounted) {
    return (
      <button
        className="theme-toggle-btn"
        aria-label="Toggle theme"
        disabled
        style={{ 
          width: 40, 
          height: 40, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'transparent',
          border: 'none',
          cursor: 'not-allowed',
          opacity: 0.5
        }}
      >
        {/* Placeholder بنفس حجم الأيقونة لمنع الـ Layout Shift */}
        <span style={{ fontSize: 20 }}>⚙️</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="theme-toggle-btn"
      aria-label="Toggle theme"
    >
      {/* ✅ الآن نعرض الأيقونة الصحيحة بناءً على الـ theme الفعلي */}
      {theme === "dark" ? (
        <FiSun size={20} className="my-auto w-full cursor-pointer" />
      ) : (
        <FiMoon size={20} className="my-auto w-full cursor-pointer" />
      )}
    </button>
  );
}