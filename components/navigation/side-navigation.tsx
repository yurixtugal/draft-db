import { Draft } from "@prisma/client";
import PrincipalMenu from "./principal-menu";
import DraftMenu from "./draft-menu";

interface SideBarNavigationProps {
  arrDrafts: Draft[];
}

const SideBarNavigation = ({arrDrafts}: SideBarNavigationProps) => {
  return <div>
    <PrincipalMenu />
    <DraftMenu arrDrafts={arrDrafts}/>
  </div>
}
 
export default SideBarNavigation;