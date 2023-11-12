"use client"

import { DraftWithCollection } from "@/types/types";
import { Draft } from "@prisma/client";
import {parseToMermaid} from "@/lib/mermaidUtils/util";

import dynamic from "next/dynamic";
import { generateDDL } from "@/lib/ddl-generator/ddl-generator";

interface DrawDraftInterface {
  draft: DraftWithCollection;
}

const ComponentC = dynamic(() => import("@/components/panel/mermaid-flow"), {
  ssr: false,
});


const DrawDraft = ({draft}: DrawDraftInterface) => {

  return   <ComponentC draft={draft} />
        
}
 
export default DrawDraft; 