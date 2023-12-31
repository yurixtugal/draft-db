"use client";

import { Draft } from "@prisma/client";
import {
  ChevronDown,
  ChevronUp,
  Database,
  MoveDown,
  SeparatorHorizontal,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { icons } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SideBarNavigationProps {
  arrDrafts: Draft[];
}

const DraftMenu = ({ arrDrafts }: SideBarNavigationProps) => {
  const pathname = usePathname();

  const [showDraft, setShowDraft] = useState(true);

  return (
    
    <div className="mt-4 mb-5">
        
        <h2 className=" text-gray-300 flex items-center mt-3 mb-3">
          <ChevronDown
            className={`h-4 w-4 hover:cursor-pointer ${
              showDraft ? "" : "hidden"
            }`}
            onClick={() => setShowDraft(!showDraft)}
          />
          <ChevronUp
            className={`h-4 w-4 hover:cursor-pointer ${
              showDraft ? "hidden" : ""
            }`}
            onClick={() => setShowDraft(!showDraft)}
          />
          <span className="ml-3 text-sm">Drafts</span>
        </h2>
        <ScrollArea  className="rounded-md h-[calc(100vh-10rem)]">
        <div className={`${showDraft ? "" : "hidden"}`}>
          {arrDrafts.map((draft, index) => {
            const LucideIcon = icons[draft.icon as keyof typeof icons];
            return (
              <Link
                href={`/draft/${draft.idDraft}/model`}
                key={index}
                className={`w-full pl-2 mb-1 h-9 flex items-center border-neutral-800 rounded-xl hover:bg-gray-700 transition ${
                  pathname.includes(draft.idDraft)
                    ? "bg-gray-700 text-green-400 font-semibold"
                    : "text-gray-300 "
                } `}
              >
                <LucideIcon className="h-4 w-4" />
                <span className="ml-3 text-sm">{draft.name}</span>
              </Link>
            );
          })}
        </div>
        <div className="h-5 w-5" ></div>

        </ScrollArea>
    </div>
  );
};

export default DraftMenu;
