"use client"

import { History, Home, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PrincipalMenu = () => {
const pathname = usePathname();
const routes = [
  {
    label: 'Home',
    href: '/',
    icon: <Home />,
    isActive: pathname === '/',
    
  },
  {
    label: 'Discover',
    href: '/discover',
    icon: <Zap />,
    isActive: pathname === '/discover',
  },
  {
    label: 'Creation history',
    href: '/creation-history',
    icon: <History />,
    isActive: pathname === '/creation-history',
  },

]

  return <div>
  {routes.map((route, index) => (
    <Link href={route.href} key={index} className={`w-full text-md font-semibold pl-2 mb-1 flex items-center h-12 border-neutral-800
    rounded-xl
    hover:bg-zinc-700/50 transition ${route.isActive?'bg-zinc-700/60':''}`}>
      {route.icon}<span className="ml-3">{route.label}</span>
    </Link>
  ))}
  </div>;
};

export default PrincipalMenu;
