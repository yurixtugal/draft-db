import NavigationDraft from "@/components/navigation/model-tabs";
import DrawDraft from "@/components/panel/envolve-draft";
import { db } from "@/lib/db";
import { orderDraft } from "@/lib/draftUtils/util";

export default async function Draft({
  params,
}: {
  params: { idDraft: string };
}) {
  return (
    <div>
       {/*<DrawDraft draft={draft} />*/}
    </div>
  );
}
