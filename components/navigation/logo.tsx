"use client"

import { DatabaseZap } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return <Link href="/" className="flex items-center justify-center mt-8 mb-7 font-semibold 
  hover:courser-pointer text-white
  "><DatabaseZap className="mr-3 h-6 w-6" />DRAFT-DB</Link>;
};

export default Logo;
