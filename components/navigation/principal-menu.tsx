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
]

  return <div>
  {routes.map((route, index) => (
    <Link href={route.href} key={index} className={`w-full text-md font-semibold pl-2 mb-1 flex items-center h-12 border-neutral-800
    rounded-xl
    hover:bg-gray-700 transition ${route.isActive?'bg-gray-700 text-green-400 font-semibold':'text-gray-300'}`}>
      {route.icon}<span className="ml-3">{route.label}</span>
    </Link>
  ))}
  </div>;
};

export default PrincipalMenu;
