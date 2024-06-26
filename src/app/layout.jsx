import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Social Network Analysis",
  description: "Generated by create next app with d3js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
