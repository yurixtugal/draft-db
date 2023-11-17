import MarketingPage from "@/components/panel/marketing-page";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Medal } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const arrDrafts = await db.draft.findMany({
    orderBy: { createdAt: "asc" },
  });
  const firstDraft = arrDrafts[0].idDraft;

  

  return <MarketingPage firstDraft={firstDraft} />;
}
