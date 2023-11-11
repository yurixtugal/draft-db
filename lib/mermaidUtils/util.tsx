import {
  DraftWithCollection,
  CollectionWithAll,
  RelationWithTypes,
  FieldWithTypes
} from "@/types/types";
import { TypeRelation } from "@prisma/client";
import { db } from "@/lib/db";

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

const relationMulti = {
  "MULTI_RELATION_MANY_TO_MANY": ["SINGLE_RELATION_ONE_TO_MANY","SINGLE_RELATION_ONE_TO_MANY"]
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

function findField(
  collection: CollectionWithAll,
  nameField: string
  ): FieldWithTypes | undefined {

    if (collection.fields)
      return collection.fields.find((field) => {
        return field.name === nameField;
      });
    else
    return undefined;


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
      let relationDraft = relationMap[relationType as keyof typeof relationMap];
      //console.log(relationType)
      if (relationDraft){
        //if is a singles relation we just draw it
        if ( !(relationType in relationMulti )) { 
          mermaidLanguage += ` ${parseNameCollection(collectionFrom)} ${relationDraft} ${parseNameCollection(collectionTo)} :""`; 
        }else{
          //if is a multi relation we obtain the reprasentation of the "From" and "To" relation
          //and we draw them to an intermediate collection
          let relationFromTo = relationMulti[relationType as keyof typeof relationMulti];
          let relationFrom= relationFromTo[0];
          let relationTo= relationFromTo[1];
          
          //We create the intermediate collection
          if (relation.nameFieldMultiFrom && relation.nameFieldMultiTo){
            let fieldFrom= findField(collectionFrom, relation.nameFieldMultiFrom);
            let fieldTo= findField(collectionTo, relation.nameFieldMultiTo);


            if (fieldFrom && fieldTo){
              let intermediateCollection : CollectionWithAll= {
                  "idCollection": ``,
                  "name": collectionFrom.name+collectionTo.name,
                  "description": `Intermediate table to relate ${collectionFrom.name} and ${collectionTo.name}` ,
                  "createdAt": new Date(),
                  "updatedAt": new Date(),
                  "idDraft": collectionFrom.idDraft,
                  "fields": [ {
                    "idField": ``, 
                    "name": relation.nameFieldMultiFrom, 
                    "description": relation.descriptionFieldFrom, 
                    "settings": {"isPK":true,"isFK":true}, 
                    "idCollection": collectionFrom.idCollection, 
                    "idTypeField": fieldFrom.idTypeField,
                    "typeField": fieldFrom.typeField
                  },{
                    "idField": ``, 
                    "name": relation.nameFieldMultiTo, 
                    "description": relation.descriptionFieldTo, 
                    "settings": {"isPK":true, "isFK":true}, 
                    "idCollection": collectionTo.idCollection, 
                    "idTypeField": fieldTo.idTypeField,
                    "typeField": fieldTo.typeField
                  } ], 
                  "relationCollectionFrom": [], 
                  "relationCollectionTo": []
                }
              
                //Now we create the new collection and the relations (From and To)
                mermaidLanguage += parseCollection(intermediateCollection);

                let relationFromDraft = relationMap[relationFrom as keyof typeof relationMap];
                let relationToDraft = relationMap[relationTo as keyof typeof relationMap];

                mermaidLanguage += ` ${parseNameCollection(collectionFrom)} ${relationFromDraft} ${parseNameCollection(intermediateCollection)} :""`; 
                mermaidLanguage += ` ${parseNameCollection(collectionTo)} ${relationToDraft} ${parseNameCollection(intermediateCollection)} :""`; 

                
                
              
            }
          } 
        }
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
        mermaidColeccion += `${field.typeField.name}`;

        //Specific types 
        if (field.settings.length)
          mermaidColeccion += `(${field.settings.length}) `;

        if (field.settings.scale && field.settings.precision)  
          mermaidColeccion += `(${field.settings.scale})(${field.settings.precision}) `;
        else if (field.settings.scale)  
          mermaidColeccion += `(${field.settings.scale}) `;
        else if (field.settings.precision)  
          mermaidColeccion += `(0)(${field.settings.precision}) `;

        mermaidColeccion += ` ${field.name}`;
        //Optional
        //PK
        let addComma=false;
        if (field.settings.isPK){
          mermaidColeccion += ` PK `;
          addComma=true;
        }
        //FK
        if (field.settings.isFK){
          if (addComma)mermaidColeccion += ` , `;
          mermaidColeccion += ` FK `; 
          addComma=true;
        }
        
        //UK
        if (field.settings.isUK){
          if (addComma)mermaidColeccion += ` , `;
          mermaidColeccion += ` UK `;   
        }

        //Field comments
        if (field.description) mermaidColeccion += `" ${field.description} "`;
        mermaidColeccion += ` \n`;
      }
    });
    mermaidColeccion += ` }\n`;
  }

  return mermaidColeccion;
}
