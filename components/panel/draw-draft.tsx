import { DraftWithCollection } from "@/types/types";
import { Draft } from "@prisma/client";
import {parseToMermaid} from "@/lib/mermaidUtils/util";

interface DrawDraftInterface {
  draft: DraftWithCollection;
}



const DrawDraft = ({draft}: DrawDraftInterface) => {
  const mermaidCode= parseToMermaid({draft});
  return <>
          <div>Drawing draft for {draft.name}</div>
          <div>Mermaid code: 
              <br></br>
              <textarea className="resize-y resize-x rounded-md" cols={30} rows={20} value={mermaidCode}></textarea>
          </div>
        </>
}
 
export default DrawDraft; 