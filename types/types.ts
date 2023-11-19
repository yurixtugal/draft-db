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
    isFK?: boolean;
    isUK?: boolean;
    
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

type FieldWithTypesApi = {
  name: string;
  description?: string;
  idTypeField: string;
  settings: {
    length?: number;
    isRequired?: boolean;
    isPK?: boolean;
    precision?: number;
    scale?: number;
    isFK?: boolean;
  }
}

type CollectionWithAllApi = {
  name: string;
  description: string;
  fields: FieldWithTypesApi[];
};


export type { DraftWithCollection };
export type { CollectionWithAll };
export type { FieldWithTypes };
export type { RelationWithTypes };
export type { FieldWithTypesApi };
export type { CollectionWithAllApi };