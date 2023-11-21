import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { idDraft: string } }
) {
  try {
    
    const { idDraft } = params;
    if (!idDraft) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    await db.field.deleteMany({
      where: {
        collection: {
          idDraft: idDraft,
        },
      },
    });

    await db.relationCollection.deleteMany({
      where: {
        collectionFrom: {
          idDraft: idDraft,
        },
      },
    });

    await db.collection.deleteMany({
      where: {
        idDraft: idDraft,
      },
    });

    await db.draft.delete({
      where: {
        idDraft: idDraft,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[STORE_ID_DELETE]", error);
    return NextResponse.json({"error":"Internal Error"}, {status: 500 });
  }
}