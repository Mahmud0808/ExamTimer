import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  weight: ["500", "600"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Exam Timer",
  description: "Track and manage your exam time effectively.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased bg-yellow`}
      >
        {children}
      </body>
    </html>
  );
}
