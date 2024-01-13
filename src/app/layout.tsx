import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnimatedCarNavbar from "@/components/navbar";
const inter = Inter({ subsets: ["latin"] });
import Context  from "@/contexts/userAccessContext";

export const metadata: Metadata = {
  title: "Autohub",
  description: "Dealer management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Context>
        <AnimatedCarNavbar />
        {children}</Context>
      </body>
    </html>
  );
}
