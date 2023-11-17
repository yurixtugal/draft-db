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
    <>
    <div className="w-full">
      <div className="flex flex-row items-center">
        <div className="basis-3/4">
          <nav className="flex items-center space-x-10 ml-10 pt-6 pb-6">
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
        <div className="basis-1/4 flex flex-row-reverse items-center  mr-10 pt-6 pb-6">
          <SearchCommand arrDrafts={arrDrafts}/>
        </div>
      </div>
  </div>
  <Separator className="bg-gray-700 w-full mb-10" />
</>
  );
};
export default NavigationDraft;
