"use client"

import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

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
    <div className="bg-[#292a2e] rounded-md p-4 h-full">
      <h2 className="text-xl text-white mb-2 bg-[#292a2e] flex">
        DDL Script{" "}
        {copied ? <CopyCheck className="pl-3 h-7 w-7 text-neutral-200" /> : <Copy className="pl-3 h-7 w-7 hover:cursor-pointer text-neutral-400 hover:text-neutral-200" 
        onClick={onCopy}
        />}
        {copied && <span className="text-base text-neutral-200 pl-3 ">Copied!</span>}
      </h2>
      <pre className="text-sm text-green-300 bg-gray-900 rounded-md p-4">
        {script}
      </pre>
    </div>
  );
};

export default ShowScript;
