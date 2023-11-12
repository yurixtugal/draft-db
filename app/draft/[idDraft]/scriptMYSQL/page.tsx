import ShowScript from "@/components/ui/showScript";
import { db } from "@/lib/db";
import { generateDDL } from "@/lib/ddl-generator/ddl-generator";
import { DraftWithCollection } from "@/types/types";

const Page = async ({
  params,
}: {
  params: { idDraft: string };
}) => {
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
  
  if (!draft) return <div>Not found</div>;

  const scriptMysql = generateDDL(draft as DraftWithCollection );
  return <>
    <ShowScript script={scriptMysql} />
  </>;
};

export default Page;
