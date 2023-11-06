import { Draft } from "@prisma/client";

interface SideBarNavigationProps {
  arrDrafts: Draft[];
}

const DraftMenu = ({arrDrafts}: SideBarNavigationProps) => {
  return <div>
  {arrDrafts.map((draft) => 
     <div key={draft.idDraft}>{draft.name}</div>
  )}
</div>
}
 
export default DraftMenu;