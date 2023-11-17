"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import SearchCommand from "./search-command";
import { Draft } from "@prisma/client";
import Logo from "./logo";
 

interface CommandItems {
  arrDrafts: Draft[];
}


const NavigationDraft = ({arrDrafts}: CommandItems) => {
  const pathname = usePathname();
  const parentRoute = pathname.split('/').slice(0, 3).join('/');
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
    <>
    <div className="w-full">
      <div className="md:hidden"><Logo /></div>
      <div className="flex flex-row items-center">
        <div className="md:basis-3/4">
          <nav className="flex items-center space-x-10 md:ml-10 pt-6 pb-6 ml-auto">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={`${parentRoute}/${route.href}`}
                className={cn(
                  'font-medium transition-colors hover:text-green-300',
                  route.active ? 'text-green-400' : 'text-gray-200'
                )}
              >
                {route.label}
            </Link>
            ))}
          </nav>
        </div>
        <div className="hidden basis-1/4 sm:flex sm:flex-row-reverse sm:items-center  mr-10 pt-6 pb-6">
          <SearchCommand arrDrafts={arrDrafts}/>
        </div>
      </div>
  </div>
  <Separator className="bg-gray-700 w-full mb-4" />
</>
  );
};
export default NavigationDraft;
