import { DraftWithCollection } from "@/types/types";
import { Draft } from "@prisma/client";

interface DrawDraftInterface {
  draft: DraftWithCollection;
}

const DrawDraft = ({draft}: DrawDraftInterface) => {
  return <div>Drawing draft for {draft.name}</div>
}
 
export default DrawDraft;