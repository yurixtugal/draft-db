"use client"

import { Medal } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import Logo from "../navigation/logo";

const MarketingPage = ({firstDraft} : {firstDraft: string}) => {
  return <>
  <ScrollArea className="rounded-md h-[calc(100vh)]">
  <div className=" md:hidden">
  <Logo/>
  </div>
  <div className="bg-gray-900 flex flex-col items-center justify-center min-h-screen py-2 text-white px-4 font-sans">
  <div className="mb-20 flex text-xs md:text-sm items-center border shadow-sm p-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full uppercase">
    <Medal className="h-4 w-4 mr-2" />
    Top Diagram Entity Relation Model Repository
  </div>{" "}
  <h1 className="text-base md:text-xl text-center text-white mb-10">
    Draft-DB Boosts Team Productivity
  </h1>
  <div className="text-base md:text-xl bg-gradient-to-r from-green-500 to-green-700 text-white px-4 p-2 rounded-md mb-10 w-fit">
    Moving Work Forward.
  </div>
  <div className="text-sm xl:text-lg text-gray-400 mt-4 max-w-xs xl:max-w-2xl text-center mx-auto  mb-20">
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
</ScrollArea></>
}
 
export default MarketingPage;