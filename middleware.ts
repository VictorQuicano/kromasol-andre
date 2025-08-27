import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "tu-secret-key"
);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Caso especial: si va a /login y ya tiene token válido
  if (pathname.startsWith("/login") && token) {
    try {
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch {
      return NextResponse.next();
    }
  }

  // Rutas protegidas
  const protectedRoutes = ["/dashboard", "/profile", "/admin"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/product/:path*",
    "/cart",
    "/success",
    "/profile/:path*",
    "/admin/:path*",
    "/login",
    "/dashboard/:path*",
  ],
};
