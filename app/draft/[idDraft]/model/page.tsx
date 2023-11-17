import { db } from "@/lib/db";
import DrawDraft from "@/components/panel/envolve-draft";
import { DraftWithCollection } from "@/types/types";
import { orderDraft } from "@/lib/draftUtils/util";
import Draft from "../page";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const Page = async ({ params }: { params: { idDraft: string } }) => {
  const idDraft = params.idDraft;
  const draft = await db.draft.findUnique({
    include: {
      collections: {
        include: {
          fields: {
            include: {
              typeField: true,
            },
          },
          relationCollectionFrom: {
            include: {
              typeRelation: true,
            },
          },
          relationCollectionTo: {
            include: {
              typeRelation: true,
            },
          },
        },
      },
    },
    where: {
      idDraft,
    },
  });

  orderDraft(draft as DraftWithCollection);

  return <DrawDraft draft={draft as DraftWithCollection} />;
};

export default Page;
