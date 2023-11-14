"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import SearchCommand from "./search-command";
import { Draft } from "@prisma/client";
 

interface CommandItems {
  arrDrafts: Draft[];
}


const NavigationDraft = ({arrDrafts}: CommandItems) => {
  const pathname = usePathname();
  const parentRoute = pathname.split('/').slice(0, 3).join('/');
  console.log('parentRoute', parentRoute);
  const routes = [{
    label: 'Model',
    href: '/model',
    active: pathname.includes('model'),
  },
  {
    label: 'Script MYSQL',
    href: '/scriptMYSQL',
    active: pathname.includes('scriptMYSQL'),
  },
  {
    label: 'Script POSTGRESQL',
    href: '/scriptPOSTGRESQL',
    active: pathname.includes('scriptPOSTGRESQL'),
  }
];

  return (
    <div className="pb-10">
      <nav
        className="items-center space-x-4 ml-10 pt-6 pb-6"
      >
        {routes.map((route) => (
          <Link
            key={route.href}
            href={`${parentRoute}/${route.href}`}
            className={cn(
              'text-xl font-medium transition-colors hover:text-neutral-100',
              route.active ? 'text-neutral-100' : 'text-neutral-400'
            )}
          >
            {route.label}
        </Link>
        ))}
      </nav>
      <SearchCommand arrDrafts={arrDrafts}/>
      <Separator className="bg-neutral-500" />
      
    </div>
  );
};
export default NavigationDraft;
