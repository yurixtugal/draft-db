import { DraftWithCollection, CollectionWithAll,RelationWithTypes } from "@/types/types";

interface DrawDraftInterface {
    draft: DraftWithCollection;
  }

export function parseToMermaid({draft}: DrawDraftInterface): string{

  let mermaidLanguage: string;

  mermaidLanguage="erDiagram  \n";

  //Comenzamos a parsear las colecciones y sus relaciones
  for (let x=0; x< draft.collections.length; x++ ){
    let coleccion= draft.collections[x];
    mermaidLanguage= mermaidLanguage + parseCollection(coleccion);
    //Una vez parseada la coleccion, vamos por las relaciones de dicha coleccion
    mermaidLanguage= mermaidLanguage + parseRelations(coleccion.relationCollectionFrom, draft.collections);
  }

  //console.log( mermaidLanguage );
  return mermaidLanguage;
}

function findCollection (collections: CollectionWithAll[], idCollection:string ): CollectionWithAll | undefined{

  return collections.find( ( collection) =>{ return collection.idCollection==idCollection; } )

}

function parseNombreCollection(collection: CollectionWithAll):string{
  return '"' + collection.name + '"' ;
}

function parseRelation(relation: RelationWithTypes, collections: CollectionWithAll[]):string {
  let mermaidLanguage:string = "";
  //Valido que la relacion tenga la data necesaria
  if (relation.idCollectionFrom && relation.idCollectionTo && relation.typeRelation){
    let collectionFrom=findCollection(collections, relation.idCollectionFrom );
    let collectionTo=findCollection(collections, relation.idCollectionTo );
    let tipoRelacion= relation.typeRelation.staticId;
    //Si se encontraron las colleciones referenciadas, procedo a crear la relacion
    if (collectionFrom && collectionTo && tipoRelacion){
      let relacion:string = "";
      switch (tipoRelacion) {
        case "SINGLE_RELATION_ZERO_TO_ONE":
          relacion="|o -- ||";
          break;
        case "SINGLE_RELATION_ONE_TO_ONE":
          relacion="|| -- ||";
          break;
        case "SINGLE_RELATION_ZERO_TO_MANY":
          relacion="|o -- o{";
          break;
        case "SINGLE_RELATION_ONE_TO_MANY":
          relacion="|| -- o{";
          break;

      }

      if (relacion!=""){
        mermaidLanguage = mermaidLanguage + parseNombreCollection(collectionFrom) + " " + relacion + " " + parseNombreCollection(collectionTo);
        mermaidLanguage = mermaidLanguage + " : " + '""'
      }

    }
  }

  return mermaidLanguage;
}

function parseRelations(relations: RelationWithTypes[], collections: CollectionWithAll[]):string {
  
  let mermaidLanguage:string = "";

  for (let x=0; x< relations.length; x++ ){
    if (relations[x]){
      let parseoRelacion= parseRelation(relations[x], collections);
      if (parseoRelacion)
        mermaidLanguage = mermaidLanguage + parseoRelacion + "\n";
    }
  }


  //console.log(relacion[0].);
  return mermaidLanguage;
}

function parseCollection(coleccion: CollectionWithAll):string {
  let mermaidColeccion: string= parseNombreCollection(coleccion);
    if (coleccion.fields){
        mermaidColeccion=mermaidColeccion+ " {\n";

        for (let f=0; f< coleccion.fields.length; f++ ){
            let field = coleccion.fields[f];
            if (field.name && field.idTypeField){
                // base obligatoria
                mermaidColeccion=mermaidColeccion+ field.typeField.name + "  " + field.name ;
                //Opcionales
                //Comentarios del campo
                if (field.description)
                  mermaidColeccion=mermaidColeccion+ ' "' + field.description + '" ';
                field.description

                mermaidColeccion=mermaidColeccion+ " \n";
            }
        }

        mermaidColeccion=mermaidColeccion+ " }\n";
    }


    //console.log(coleccion);
    return mermaidColeccion;
}
