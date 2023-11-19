"use client";

import { DraftWithCollection } from "@/types/types";
import { Draft } from "@prisma/client";
import { parseToMermaid } from "@/lib/mermaidUtils/util";

import dynamic from "next/dynamic";
import { generateDDL } from "@/lib/ddl-generator/ddl-generator";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface DrawDraftInterface {
  draft: DraftWithCollection;
}

const ComponentC = dynamic(() => import("@/components/panel/mermaid-flow"), {
  ssr: false,
});

const DrawDraft = ({ draft }: DrawDraftInterface) => {
  return (
    <ScrollArea  className="rounded-md h-[calc(100vh-10rem)]">
      <div className="pl-10 mr-8">
        <div className="pb-2 pr-5 text-2xl text-white mb-3">{draft?.name}</div>
        <div className="pb-2 mr-5 text-sm text-gray-200 mb-6">{draft?.description}</div>
        <div className="">
          <ComponentC draft={draft} />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default DrawDraft;
