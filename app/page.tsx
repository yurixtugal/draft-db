import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Medal } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const arrDrafts = await db.draft.findMany();
  const firstDraft = arrDrafts[0].idDraft;

  

  return (
    <div className="bg-gray-900 flex flex-col items-center justify-center min-h-screen py-2 text-white px-4 font-sans">
      <div className="mb-20 flex text-sm xl:text-base items-center border shadow-sm p-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full uppercase">
        <Medal className="h-6 w-6 mr-2" />
        Top Diagram Entity Relation Model Repository and Generator
      </div>{" "}
      <h1 className="text-3xl xl:text-5xl text-center text-white mb-10">
        Draft-DB Boosts Team Productivity
      </h1>
      <div className="text-3xl xl:text-5xl bg-gradient-to-r from-green-500 to-green-700 text-white px-4 p-2 rounded-md mb-10 w-fit">
        Moving Work Forward.
      </div>
      <div className="text-md xl:text-2xl text-gray-400 mt-4 max-w-xs xl:max-w-2xl text-center mx-auto  mb-20">
        Draft-DB is your go-to application for generating entity-relationship
        diagrams. From large corporations to small startups, every team can
        benefit from visualizing their data models. Generate diagrams, view
        models, and create scripts for databases effortlessly with Draft-DB.
      </div>
      <Button
        size="lg"
        className="bg-indigo-500 hover:bg-indigo-400"
        variant="default"
      >
        <Link href={`/draft/${firstDraft}/model`}>Get Started</Link>
      </Button>
    </div>
  );
}
