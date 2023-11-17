"use client";

import { MenuSquare } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const DraftMenuVertical = () => {
  

  return (
    <Sheet>
      <SheetTrigger asChild>
        <MenuSquare
          className="absolute ml-10 hover:cursor-pointer"
        />{" "}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DraftMenuVertical;
