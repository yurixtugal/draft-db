import { Draft } from "@prisma/client";

interface DrawDraftInterface {
  draft: Draft;
}

const DrawDraft = ({draft}: DrawDraftInterface) => {
  return <div>Drawing draft for {draft.name}</div>
}
 
export default DrawDraft;