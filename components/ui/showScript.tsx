"use client"

import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { TypeAnimation } from 'react-type-animation';


const ShowScript = ({ script }: { script: string }) => {

  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }


  return (
    <div className=" rounded-md pl-6 h-full">
      <h2 className="text-xl pl-4 text-white mb-2  flex">
        DDL Script{" "}
        {copied ? <CopyCheck className="pl-3 h-7 w-7 text-neutral-200" /> : <Copy className="pl-3 h-7 w-7 hover:cursor-pointer text-neutral-400 hover:text-neutral-200" 
        onClick={onCopy}
        />}
        {copied && <span className="text-base text-neutral-200 pl-3 ">Copied!</span>}
      </h2>
      <ScrollArea className="rounded-md p-4 mr-6 h-4/6 w-5/5 border-2 border-green-500">
        <pre className="text-sm text-green-300  rounded-md p-4">
        <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        script
      ]}
      wrapper="span"
      speed={99}
    />        </pre>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ShowScript;
