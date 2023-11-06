import DrawDraft from "@/components/panel/draw-draft";
import { db } from "@/lib/db";
import dynamic from "next/dynamic";

const ComponentC = dynamic(() => import("@/components/panel/mermaid-flow"), {
  ssr: false,
});

export default async function Draft({
  params,
}: {
  params: { idDraft: string };
}) {
  const idDraft = params.idDraft;
  console.log(idDraft);
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
      <ComponentC draft={draft} />
    </div>
  );
}
