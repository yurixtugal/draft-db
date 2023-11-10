import DrawDraft from "@/components/panel/envolve-draft";
import { db } from "@/lib/db";

export default async function Draft({
  params,
}: {
  params: { idDraft: string };
}) {
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

  return (
    <div>
      <DrawDraft draft={draft} />
    </div>
  );
}
