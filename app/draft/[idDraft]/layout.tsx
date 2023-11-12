import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { db } from "@/lib/db";
import NavigationDraft from "@/components/navigation/model-tabs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  
  return (
    <main className="flex-col fixed z-29 inset-y-0 bg-[#292a2e] text-neutral-300 w-full">
      <NavigationDraft />
      {children}
    </main>
  );
}