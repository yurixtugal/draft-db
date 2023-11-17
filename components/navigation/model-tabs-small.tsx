"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import SearchCommand from "./search-command";
import { Draft } from "@prisma/client";
import Logo from "./logo";
import { MenuSquare, Sandwich } from "lucide-react";
import DraftMenuVertical from "./draft-menu-vertical";

interface CommandItems {
  arrDrafts: Draft[];
}

const NavigationDraftSmall = ({ arrDrafts }: CommandItems) => {
  const pathname = usePathname();
  const parentRoute = pathname.split("/").slice(0, 3).join("/");
  const routes = [
    {
      label: "Model",
      href: "/model",
      active: pathname.includes("model"),
    },
    {
      label: "Script MYSQL",
      href: "/scriptMYSQL",
      active: pathname.includes("scriptMYSQL"),
    },
    {
      label: "Script POSTGRESQL",
      href: "/scriptPOSTGRESQL",
      active: pathname.includes("scriptPOSTGRESQL"),
    },
  ];



  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between mx-10">
        <Logo />
        <SearchCommand arrDrafts={arrDrafts} />
        </div>
        
        
        <nav className="flex items-stretch space-x-10 my-7 justify-between mx-10">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={`${parentRoute}/${route.href}`}
              className={cn(
                "font-medium transition-colors hover:text-green-300",
                route.active ? "text-green-400" : "text-gray-200"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </div>

      <Separator className="bg-gray-700 w-full mb-4" />

    </>
  );
};
export default NavigationDraftSmall;
