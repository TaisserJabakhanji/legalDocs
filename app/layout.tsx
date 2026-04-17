// app/layout.tsx
import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Legal Documents",
  description: "مستندات قانونية احترافية",
};

// ✅ هذا الـ Layout بسيط جداً وبدون params أو notFound
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}