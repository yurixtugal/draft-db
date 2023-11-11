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
  const mermaidCode= parseToMermaid({draft});
  const dml = generateDDL(draft)
  return <>
          <div>Drawing draft for {draft.name}</div>
          <div>Mermaid code: 
              <br></br>
              <textarea className="resize rounded-md" cols={50} rows={10} value={dml}></textarea>
              <textarea className="resize rounded-md" cols={50} rows={10} value={mermaidCode}></textarea>
          </div>
          <ComponentC draft={draft} />
        </>
}
 
export default DrawDraft; 