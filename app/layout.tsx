import type { Metadata } from "next";
import { Poppins } from 'next/font/google';

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { LayoutInterface } from "@/types";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: "Keep It",
  description: "Files, secured and synced-anytime, anywhere.",
};

export default function RootLayout({
  children,
}: Readonly<LayoutInterface>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins antialiased`}
      >
        {children}
        <Toaster richColors/>
      </body>
    </html>
  );
}
