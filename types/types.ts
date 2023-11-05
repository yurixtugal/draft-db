import { Collection, Draft } from "@prisma/client";

type DraftWithCollection = Draft & {
  collections: Collection[];
};


export type { DraftWithCollection };