import {
  DraftWithCollection,
  CollectionWithAll,
  RelationWithTypes,
} from "@/types/types";
import mermaid from "mermaid";

interface DrawDraftInterface {
  draft: DraftWithCollection;
}

const relationMap = {
  "SINGLE_RELATION_ZERO_TO_ONE": "|o -- ||",
  "SINGLE_RELATION_ONE_TO_ONE": "|| -- ||",
  "SINGLE_RELATION_ZERO_TO_MANY": "|o -- o{",
  "SINGLE_RELATION_ONE_TO_MANY": "|| -- o{",
  "MULTI_RELATION_MANY_TO_MANY": "o{ -- o{",
}


export function parseToMermaid({ draft }: DrawDraftInterface): string {
  let mermaidLanguage = `erDiagram  \n`;

  //Start to parse the draft and its relations
  draft.collections.forEach((collection) => {
    mermaidLanguage += parseCollection(collection);
    // once collection is pared, go for its collection's relations
    mermaidLanguage += parseRelations(
      collection.relationCollectionFrom,
      draft.collections
    );
  });

  return mermaidLanguage;
}

function findCollection(
  collections: CollectionWithAll[],
  idCollection: string
): CollectionWithAll | undefined {
  return collections.find((collection) => {
    return collection.idCollection === idCollection;
  });
}

function parseNameCollection(collection: CollectionWithAll): string {
  return `"${collection.name}"`;
}

function parseRelation(
  relation: RelationWithTypes,
  collections: CollectionWithAll[]
): string {
  let mermaidLanguage: string = "";
  //validate structure relation
  if (
    relation.idCollectionFrom &&
    relation.idCollectionTo &&
    relation.typeRelation
  ) {
    let collectionFrom = findCollection(collections, relation.idCollectionFrom);
    let collectionTo = findCollection(collections, relation.idCollectionTo);
    let relationType = relation.typeRelation.staticId;
    //create relations in mermaid, if collectionFrom and To exist
    

    if (collectionFrom && collectionTo && relationType) {
      let relation = relationMap[relationType as keyof typeof relationMap];

      if (relation) {
        mermaidLanguage += ` ${parseNameCollection(collectionFrom)} ${relation} ${parseNameCollection(collectionTo)} :""`; 
      }
    }
  }

  return mermaidLanguage;
}

function parseRelations(
  relations: RelationWithTypes[],
  collections: CollectionWithAll[]
): string {
  let mermaidLanguage = ``;
  
  relations.forEach((relation) => {
    if (relation) {
      let relationParsed = parseRelation(relation, collections);
       mermaidLanguage +=  relationParsed?relationParsed:``;
    }
  });

  return mermaidLanguage;
}

function parseCollection(coleccion: CollectionWithAll): string {
  let mermaidColeccion = parseNameCollection(coleccion);

  if (coleccion.fields) {
    mermaidColeccion += ` {\n`;
    coleccion.fields.forEach((field) => {
      if (field.name && field.idTypeField) {
        // required base
        mermaidColeccion += `${field.typeField.name} ${field.name}`;
        //Optional
        //Field comments
        if (field.description) mermaidColeccion += `" ${field.description} "`;
        mermaidColeccion += ` \n`;
      }
    });
    mermaidColeccion += ` }\n`;
  }

  return mermaidColeccion;
}
