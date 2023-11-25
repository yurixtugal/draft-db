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
    icon: <Home className="h-4 w-4" />,
    isActive: pathname === '/',
    
  },
]

  return <div>
  {routes.map((route, index) => (
    <Link href={route.href} key={index} className={`w-full text-base pl-2 mb-4 flex items-center h-9 border-neutral-800
    rounded-xl
    hover:bg-gray-700 transition ${route.isActive?'bg-gray-700 text-green-400 font-semibold':'text-gray-300'}`}>
      {route.icon}<span className="ml-2 mt-1 text-sm">{route.label}</span>
    </Link>
  ))}
  </div>;
};

export default PrincipalMenu;
