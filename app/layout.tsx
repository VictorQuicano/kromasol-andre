import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { VercelToolbar } from "@vercel/toolbar/next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";

const cabin = Cabin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cabin",
});

export const metadata: Metadata = {
  title: "Kromasol by Andrew",
  description: "Los mejores profuctos para tu salud, de Kromasol para ti",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${cabin.variable} min-w-full`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
