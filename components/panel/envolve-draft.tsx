"use client";

import { DraftWithCollection } from "@/types/types";
import { Draft } from "@prisma/client";
import { parseToMermaid } from "@/lib/mermaidUtils/util";

import dynamic from "next/dynamic";
import { generateDDL } from "@/lib/ddl-generator/ddl-generator";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface DrawDraftInterface {
  draft: DraftWithCollection;
}

const ComponentC = dynamic(() => import("@/components/panel/mermaid-flow"), {
  ssr: false,
});

const DrawDraft = ({ draft }: DrawDraftInterface) => {
  const router = useRouter();

  const deleteDraft = async () => {
    if (confirm("Are you sure you want to delete this draft?")) {
      console.log(draft.idDraft);
      const res = await fetch(`/api/draft/${draft.idDraft}`, {
        method: "DELETE",
      });

      router.push("/");
    }
  };

  return (
    <>
      <div className="pl-10 mr-8">
        <ScrollArea className="h-[calc(100vh-10rem)] md:h-[calc(100vh-5rem)]">
          <div className="flex flex-row justify-between pr-5 text-white mb-1">
            <span className="font-semibold text-sm">
              {draft?.name} -{" "}
              <span className="text-sm font-normal">{draft?.description}</span>
            </span>
            {/*
            <Button
              variant="destructive"
              className="ml-2"
              onClick={deleteDraft}
            >
              Delete
            </Button>
          //*/}
          </div>
          <div className="">
            <ComponentC draft={draft} />
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default DrawDraft;
