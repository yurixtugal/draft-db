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

interface SideBarNavigationProps {
  arrDrafts: Draft[];
}

const DraftMenu = ({ arrDrafts }: SideBarNavigationProps) => {
  const pathname = usePathname();

  const [showDraft, setShowDraft] = useState(true);
  
  return (
    <div className="mt-7">
      <Separator className="bg-gray-700" />
      <h2 className="font-semibold text-gray-300 flex items-center mt-7 mb-4">
        <ChevronDown
          className={`h-5 w-5 hover:cursor-pointer ${
            showDraft ? "" : "hidden"
          }`}
          onClick={() => setShowDraft(!showDraft)}
        />
        <ChevronUp
          className={`h-5 w-5 hover:cursor-pointer ${
            showDraft ? "hidden" : ""
          }`}
          onClick={() => setShowDraft(!showDraft)}
        />
        <span className="ml-3">Drafts</span>
      </h2>
      <div className={`${showDraft ? "" : "hidden"}`}>
        {arrDrafts.map((draft, index) => {
          const LucideIcon = icons[draft.icon as keyof typeof icons];
          return (
          <Link
            href={`/draft/${draft.idDraft}/model`}
            key={index}
            className={`w-full pl-2 mb-1 flex items-center h-12 border-neutral-800 rounded-xl hover:bg-gray-700 transition ${
              pathname.includes(draft.idDraft)
                ? "bg-gray-700 text-green-400"
                : "text-gray-300"
            } text-md font-semibold `}
          > 
            <LucideIcon className="h-5 w-5" /> 
            <span className="ml-3">{draft.name}</span>
          </Link>
        )})}
      </div>
    </div>
  );
};

export default DraftMenu;
