-- public."Draft" definition

-- Drop table

-- DROP TABLE public."Draft";

CREATE TABLE public."Draft" (
	"idDraft" text NOT NULL,
	"name" text NOT NULL,
	description text NULL,
	"createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp(3) NOT NULL,
	icon text NOT NULL DEFAULT 'database'::text,
	CONSTRAINT "Draft_pkey" PRIMARY KEY ("idDraft")
);

-- public."Collection" definition

-- Drop table

-- DROP TABLE public."Collection";

CREATE TABLE public."Collection" (
	"idCollection" text NOT NULL,
	"name" text NOT NULL,
	description text NULL,
	"createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp(3) NOT NULL,
	"idDraft" text NOT NULL,
	CONSTRAINT "Collection_pkey" PRIMARY KEY ("idCollection")
);


-- public."Collection" foreign keys

ALTER TABLE public."Collection" ADD CONSTRAINT "Collection_idDraft_fkey" FOREIGN KEY ("idDraft") REFERENCES public."Draft"("idDraft") ON DELETE RESTRICT ON UPDATE CASCADE;

-- public."TypeField" definition

-- Drop table

-- DROP TABLE public."TypeField";

CREATE TABLE public."TypeField" (
	"idTypeField" text NOT NULL,
	"name" text NOT NULL,
	description text NULL,
	"staticId" text NOT NULL,
	"mysqlDataType" text NOT NULL DEFAULT '-'::text,
	"postgresDataType" text NOT NULL DEFAULT '-'::text,
	CONSTRAINT "TypeField_pkey" PRIMARY KEY ("idTypeField")
);

-- public."TypeRelation" definition

-- Drop table

-- DROP TABLE public."TypeRelation";

CREATE TABLE public."TypeRelation" (
	"idTypeRelation" text NOT NULL,
	"name" text NOT NULL,
	description text NULL,
	"staticId" text NOT NULL,
	CONSTRAINT "TypeRelation_pkey" PRIMARY KEY ("idTypeRelation")
);

-- public."Field" definition

-- Drop table

-- DROP TABLE public."Field";

CREATE TABLE public."Field" (
	"idField" text NOT NULL,
	"name" text NOT NULL,
	description text NULL,
	settings jsonb NOT NULL,
	"idCollection" text NOT NULL,
	"idTypeField" text NOT NULL,
	CONSTRAINT "Field_pkey" PRIMARY KEY ("idField")
);


-- public."Field" foreign keys

ALTER TABLE public."Field" ADD CONSTRAINT "Field_idCollection_fkey" FOREIGN KEY ("idCollection") REFERENCES public."Collection"("idCollection") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE public."Field" ADD CONSTRAINT "Field_idTypeField_fkey" FOREIGN KEY ("idTypeField") REFERENCES public."TypeField"("idTypeField") ON DELETE RESTRICT ON UPDATE CASCADE;

-- public."RelationCollection" definition

-- Drop table

-- DROP TABLE public."RelationCollection";

CREATE TABLE public."RelationCollection" (
	"idRelationCollection" text NOT NULL,
	"createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp(3) NOT NULL,
	"idCollectionFrom" text NOT NULL,
	"idCollectionTo" text NOT NULL,
	"idTypeRelation" text NOT NULL,
	"descriptionFieldFrom" text NULL,
	"descriptionFieldSingle" text NULL,
	"descriptionFieldTo" text NULL,
	"nameFieldMultiFrom" text NULL,
	"nameFieldMultiTo" text NULL,
	"nameFieldSingle" text NULL,
	CONSTRAINT "RelationCollection_pkey" PRIMARY KEY ("idRelationCollection")
);


-- public."RelationCollection" foreign keys

ALTER TABLE public."RelationCollection" ADD CONSTRAINT "RelationCollection_idCollectionFrom_fkey" FOREIGN KEY ("idCollectionFrom") REFERENCES public."Collection"("idCollection") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE public."RelationCollection" ADD CONSTRAINT "RelationCollection_idCollectionTo_fkey" FOREIGN KEY ("idCollectionTo") REFERENCES public."Collection"("idCollection") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE public."RelationCollection" ADD CONSTRAINT "RelationCollection_idTypeRelation_fkey" FOREIGN KEY ("idTypeRelation") REFERENCES public."TypeRelation"("idTypeRelation") ON DELETE RESTRICT ON UPDATE CASCADE;


INSERT INTO public."TypeField" ("idTypeField","name",description,"staticId","mysqlDataType","postgresDataType") VALUES
	 ('52c13096-498c-429a-9ecc-e3fe80a4f6a7','uuid','represents PK','UUID','VARCHAR(36)','UUID'),
	 ('e38a76e3-65f8-4717-a5c6-05844db49405','string','represents varchar in DB','STRING','VARCHAR','VARCHAR'),
	 ('e1e74289-b56b-4282-810e-fa5f17e7d91c','decimal','represents a double','DOUBLE','DECIMAL','DECIMAL'),
	 ('c26a7bb7-2a53-410c-b946-b062b400e7dc','integer','represents a int number','INTEGER','INT','INT'),
	 ('6be697ed-1353-42ac-9ec4-ebb1581dc98b','json','represents a JSON','JSON','JSON','JSON'),
	 ('ace0aaf5-6bb6-4826-9e99-88e09861d600','date','representes a date','DATE','DATE','DATE'),
	 ('41b2a70c-d6cf-4b21-b8ac-3116fcb98b8c','date-time','Represents a Date time','DATE_TIME','DATETIME','DATETIME');

INSERT INTO public."TypeRelation" ("idTypeRelation","name",description,"staticId") VALUES
	 ('e5720ba2-e63d-41ab-afb6-e7857a3aa398','Multi relation (Many to Many)','Reprents multi relation N to N','MULTI_RELATION_MANY_TO_MANY'),
	 ('46f4ca0c-9e9e-4d65-b121-02f739fe3297','Single relation (Zero to Many)','Reprents a FK of single relation 0 to N','SINGLE_RELATION_ZERO_TO_MANY'),
	 ('4853d159-3cc5-4812-8aec-94325bac02c7','Single relation (Zero or one)','Reprents a FK of single relation 0 to 1','SINGLE_RELATION_ZERO_TO_ONE'),
	 ('f5455f12-a7ce-4236-b127-e2fd8422d505','Single relation (One to one)','Reprents a FK of single relation 1 to 1','SINGLE_RELATION_ONE_TO_ONE'),
	 ('f741fd15-0911-4f57-aa03-9113cfea516e','Single relation (One to Many)','Reprents a FK of single relation 1 to N','SINGLE_RELATION_ONE_TO_MANY');

