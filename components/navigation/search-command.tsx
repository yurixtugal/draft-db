"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Draft } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

interface CommandItems {
  arrDrafts: Draft[];
}

const SearchCommand = ({ arrDrafts }: CommandItems) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [key, setKey] = React.useState("");

  const router = useRouter();

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? arrDrafts.find((draft) => draft.idDraft === key)?.name
              : "Search draft..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search draft..." />
            <CommandEmpty>No draft found.</CommandEmpty>
            <CommandGroup>
              {arrDrafts.map((draft) => (
                <CommandItem
                  key={draft.idDraft}
                  value={draft.name}
                  onSelect={(currentValue) => {
                    
                    if (!(currentValue === value)){
                      setValue(currentValue);
                      setKey(draft.idDraft);
                    }
                    setOpen(false);
                    router.push(`/draft/${draft.idDraft}/model`);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      key === draft.idDraft ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {draft.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchCommand;
