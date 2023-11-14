import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBarNavigation from "@/components/navigation/side-navigation";
import { db } from "@/lib/db";
import Image from "next/image";
import Logo from "@/components/navigation/logo";
import NavigationDraft from "@/components/navigation/model-tabs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const arrDrafts = await db.draft.findMany();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full">
          <div className="hidden md:flex w-[300px] flex-col fixed z-30 inset-y-0 bg-[#1e1f22] text-neutral-300">
            <Logo />
            <SideBarNavigation arrDrafts={arrDrafts} />
          </div>
          <main className="md:pl-[300px] flex-col fixed z-29 inset-y-0 bg-[#292a2e] text-neutral-300 w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
