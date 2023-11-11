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

