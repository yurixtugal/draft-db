"use client"

import { DatabaseZap } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return <Link href="/" className="flex items-center justify-center mt-4 mb-4 font-semibold 
  hover:courser-pointer text-neutral-200
  "><DatabaseZap size={32} className="mr-3" />DRAFT-DB</Link>;
};

export default Logo;
