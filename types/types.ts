import { Collection, Draft, Field, RelationCollection, TypeField, TypeRelation } from "@prisma/client";

type DraftWithCollection = Draft & {
  collections: CollectionWithAll[];
}

type FieldWithTypes = Field & {
  typeField: TypeField;
} & {
  settings: {
    length?: number;
    isRequired?: boolean;
    isPK?: boolean;
    precision?: number;
    scale?: number;
    
  }
}

type RelationWithTypes = RelationCollection & {
  typeRelation: TypeRelation;
}

type CollectionWithAll = Collection & {
  fields: FieldWithTypes[];
  relationCollectionFrom: RelationWithTypes[];
  relationCollectionTo: RelationWithTypes[];
};


export type { DraftWithCollection };
export type { CollectionWithAll };
export type { FieldWithTypes };
export type { RelationWithTypes };