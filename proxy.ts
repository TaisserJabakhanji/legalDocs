// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|locales|api).*)"],
};

const locales = ["ar", "en"];
const defaultLocale = "ar";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // تجاهل الملفات الثابتة والـ API
  if (
    pathname.includes(".") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/locales")
  ) {
    return NextResponse.next();
  }

  // تحقق إذا كان المسار يحتوي على locale صحيح
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // توجيه المستخدم للـ defaultLocale
  const redirectUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
  return NextResponse.redirect(redirectUrl);
}

// middleware.ts → proxy.ts (في جذر المشروع)




export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.includes(".") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/locales")
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  const redirectUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
  return NextResponse.redirect(redirectUrl);
}