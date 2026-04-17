// app/[locale]/layout.tsx
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: isAr ? "%s | المستندات القانونية" : "%s | Legal Docs",
      default: isAr
        ? "المستندات القانونية - أنشئ عقودك في دقائق"
        : "Legal Docs - Create Contracts in Minutes",
    },
    description: isAr
      ? "منصة احترافية لإنشاء المستندات القانونية المعتمدة. قوالب جاهزة، تعديل سهل، وتصدير فوري."
      : "Professional platform for creating legal documents. Ready templates, easy editing, instant export.",
    keywords: isAr
      ? [
          "مستندات قانونية",
          "عقود",
          "قوالب قانونية",
          "محاماة",
          "توقيع إلكتروني",
          "قانون",
        ]
      : [
          "legal documents",
          "contracts",
          "legal templates",
          "lawyer",
          "e-signature",
          "legal tech",
        ],
    authors: [{ name: isAr ? "فريق المستندات القانونية" : "Legal Docs Team" }],
    creator: "Legal Docs",
    publisher: "Legal Docs",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: "/ar",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      locale,
      siteName: isAr ? "المستندات القانونية" : "Legal Docs",
    },
    twitter: {
      card: "summary_large_image",
      site: "@legalDocs",
      creator: "@legalDocs",
    },
  };
}

const locales = ["ar", "en"] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ✅ params الآن Promise → لازم نستخدم await
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // ✅ ننتظر الـ params عشان نطلع اللغة
  const { locale } = await params;

  // ✅ التحقق من اللغة (مسموح هون)
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  const dir = locale === "ar" ? "rtl" : "ltr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: locale === "ar" ? "المستندات القانونية" : "Legal Docs",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    sameAs: [
      "https://twitter.com/legaldocs",
      "https://linkedin.com/company/legaldocs",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+962-XXX-XXXXXX",
      contactType: "customer service",
      areaServed: ["AE", "SA", "EG", "JO", "US"],
      availableLanguage: ["Arabic", "English"],
    },
  };

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
