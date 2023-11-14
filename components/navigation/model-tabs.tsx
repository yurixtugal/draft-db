"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";


const NavigationDraft = () => {
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
  <div className="pb-10 w-full">
    <nav className="flex items-center space-x-10 ml-10 pt-6 pb-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={`${parentRoute}/${route.href}`}
          className={cn(
            'text-xl font-medium transition-colors hover:text-green-300',
            route.active ? 'text-green-400' : 'text-gray-200'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
    <Separator className="bg-gray-700 w-full" />
  </div>
);
};
export default NavigationDraft;
