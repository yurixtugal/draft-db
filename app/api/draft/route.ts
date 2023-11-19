import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { draftSchema } from "@/validations/index.";
import { CollectionWithAll, CollectionWithAllApi } from "@/types/types";
import { Collection } from "@prisma/client";

const typeRelations = {
  ManyToMany: "MULTI_RELATION_MANY_TO_MANY",
  ZeroToMany: "SINGLE_RELATION_ZERO_TO_MANY",
  ZeroToOne: "SINGLE_RELATION_ZERO_TO_ONE",
  OneToOne: "SINGLE_RELATION_ONE_TO_ONE",
  OneToMany: "SINGLE_RELATION_ONE_TO_MANY",
  ManyToOne: "SINGLE_RELATION_ONE_TO_MANY",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const draftValidation = draftSchema.safeParse(body.draft);

    if (!draftValidation.success) {
      return new NextResponse(JSON.stringify(draftValidation.error), {
        status: 400,
      });
    }

    const { icon, name, description } = body.draft;
    const arrCollections = body.collections;

    const arrTypeRelation = await db.typeRelation.findMany();

    const draftCreated = await db.draft.create({
      data: {
        name,
        description,
        icon,
      },
    });
    let arrCollectionsCreated: Collection[] = [];

    for (let index = 0; index < arrCollections.length; index++) {
      const collection: CollectionWithAllApi = arrCollections[index];
      const arrFormatedFields = collection.fields
        .map((field) => ({
          name: field.name,
          description: field.description,
          idTypeField: field.idTypeField,
          settings: field.settings ? field.settings : {},
        }))
        .filter(
          (field) =>
            typeRelations[
              field.settings.relationType as keyof typeof typeRelations
            ] !== typeRelations.ManyToMany
        );
      const collectionCreated = await db.collection.create({
        data: {
          name: collection.name,
          description: collection.description,
          idDraft: draftCreated.idDraft,
          fields: {
            createMany: {
              data: arrFormatedFields,
            },
          },
        },
      });

      arrCollectionsCreated.push(collectionCreated);
    }

    for (let index = 0; index < arrCollections.length; index++) {
      const collectionApi = arrCollections[index];
      for (
        let indexField = 0;
        indexField < collectionApi.fields.length;
        indexField++
      ) {
        const field = collectionApi.fields[indexField];
        
        if ( field.settings &&
          field.settings.isFK &&
          typeRelations[
            field.settings.relationType as keyof typeof typeRelations
          ] !== typeRelations.ManyToMany
        ) {

          const nameFieldSingle = field.name;
          const descriptionFieldSingle = `${field.description} (FK)`;
          const nameCollectionFrom = field.name.split("id")[1];

          const idCollectionFrom = arrCollectionsCreated.find(
            (collectionDB) =>
              collectionDB.name === nameCollectionFrom &&
              collectionDB.idDraft === draftCreated.idDraft
          )?.idCollection;
          if (!idCollectionFrom)
            return new NextResponse(
              JSON.stringify({
                message: "Collection From not found",
                detail: `Collection From not found with name ${nameCollectionFrom} and idDraft ${draftCreated.idDraft}`,
              }),
              {
                status: 500,
              }
            );

          const idCollectionTo = arrCollectionsCreated.find(
            (collectionDB) =>
              collectionDB.name === collectionApi.name &&
              collectionDB.idDraft === draftCreated.idDraft
          )?.idCollection;
          if (!idCollectionTo)
            return new NextResponse("Collection To not found", {
              status: 500,
            });
          const typeRelationSingle = arrTypeRelation.find(
            (typeRelation) =>
              typeRelation.staticId ===
              typeRelations[
                field.settings.relationType as keyof typeof typeRelations
              ]
          );

          if (!typeRelationSingle) {
            return new NextResponse("Single relation not found", {
              status: 500,
            });
          }
          await db.relationCollection.create({
            data: {
              idCollectionFrom,
              idCollectionTo,
              idTypeRelation: typeRelationSingle.idTypeRelation,
              descriptionFieldSingle,
              nameFieldSingle,
            },
          });
        } else {
          if ( field.settings &&
            field.settings.isFK &&
            typeRelations[
              field.settings.relationType as keyof typeof typeRelations
            ] === typeRelations.ManyToMany
          ) {
            console.log("[DRAFT_POST] should add ManyToMany");

            const nameCollectionTo = field.name.split("id")[1];

            const idCollectionTo = arrCollectionsCreated.find(
              (collectionDB) =>
                collectionDB.name === nameCollectionTo &&
                collectionDB.idDraft === draftCreated.idDraft
            )?.idCollection;
            if (!idCollectionTo)
              return new NextResponse(
                JSON.stringify({
                  message: "Collection From not found",
                  detail: `Collection From not found with name ${nameCollectionTo} and idDraft ${draftCreated.idDraft}`,
                }),
                {
                  status: 500,
                }
              );

            const nameFieldTo = field.name;
            const descriptionFieldTo = `${field.description} (FK)`;

            const idCollectionFrom = arrCollectionsCreated.find(
              (collectionDB) =>
                collectionDB.name === collectionApi.name &&
                collectionDB.idDraft === draftCreated.idDraft
            )?.idCollection;
            if (!idCollectionFrom)
              return new NextResponse("Collection From not found", {
                status: 500,
              });

            const nameFieldFrom = `id${collectionApi.name}`;
            const descriptionFieldFrom = `${collectionApi.name} (FK)`;

            const typeRelationMulti = arrTypeRelation.find(
              (typeRelation) =>
                typeRelation.staticId === typeRelations.ManyToMany
            );

            if (!typeRelationMulti)
              return new NextResponse("Multi relation not found", {
                status: 500,
              });

            await db.relationCollection.create({
              data: {
                idCollectionFrom,
                idCollectionTo,
                idTypeRelation: typeRelationMulti.idTypeRelation,
                nameFieldMultiFrom: nameFieldFrom,
                descriptionFieldFrom: descriptionFieldFrom,
                nameFieldMultiTo: nameFieldTo,
                descriptionFieldTo: descriptionFieldTo,
              },
            });
          }
        }
      }
    }

    const draftToSend = await db.draft.findUnique({
      where: {
        idDraft: draftCreated.idDraft,
      },
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
          },
        },
      },
    });
    console.log("[DRAFT_POST] finish");
    return new NextResponse(JSON.stringify({ draft: draftToSend }), {
      status: 201,
    });
  } catch (error) {
    console.log("[DRAFT_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
