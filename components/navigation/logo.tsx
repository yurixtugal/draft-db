"use client"

import { DatabaseZap } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return <>
  <div className="flex items-center justify-center mt-5 sm:mt-8 sm:mb-7 font-semibold 
  hover:courser-pointer text-white
  "><Link href="/" className="flex"><DatabaseZap className="mr-3 h-6 w-6" />DRAFT-DB</Link></div>
  </>
};

export default Logo;
