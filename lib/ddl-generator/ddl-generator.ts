import {
  CollectionWithAll,
  DraftWithCollection,
  FieldWithTypes,
  RelationWithTypes,
} from "@/types/types";

const RelationWithTypes = {
  SINGLE_RELATION_ONE_TO_MANY: "SINGLE_RELATION_ONE_TO_MANY",
  MULTI_RELATION_MANY_TO_MANY: "MULTI_RELATION_MANY_TO_MANY",
};

const createRelationMysql = (
  collection: CollectionWithAll[],
  relation: RelationWithTypes
) => {
  let sql = ``;
  const collectionFrom = collection.find(
    (c) => c.idCollection === relation.idCollectionFrom
  );
  const collectionTo = collection.find(
    (c) => c.idCollection === relation.idCollectionTo
  );
  if (!collectionFrom || !collectionTo) return ``;
  
  const typeRelation = relation.typeRelation;
  
  const tableFrom = convertToPascalCase(collectionFrom.name);
  const tableTo = convertToPascalCase(collectionTo.name);
  
  const pkFieldFrom = collectionFrom.fields.find((f) => f.settings.isPK);
  const pkFieldTo = collectionTo.fields.find((f) => f.settings.isPK);
  
  if (!pkFieldFrom || !pkFieldTo) return ``;

  const pkFrom = pkFieldFrom?.name;
  const pkTo = pkFieldTo?.name;

  const isRelationTable = true;
  const dataTypeFrom = generateDataTypeMysql(pkFieldFrom, isRelationTable);
  const dataTypeTo = generateDataTypeMysql(pkFieldTo, isRelationTable);


  if (typeRelation.staticId === RelationWithTypes.SINGLE_RELATION_ONE_TO_MANY) {
    sql = `ALTER TABLE ${tableTo} ADD CONSTRAINT ${tableTo}_${tableFrom}_fk FOREIGN KEY (${relation.nameFieldSingle}) REFERENCES ${tableFrom}(${pkFrom});`;
  }
  if (typeRelation.staticId === RelationWithTypes.MULTI_RELATION_MANY_TO_MANY) {
    const tableRelation = convertToPascalCase(
      `${collectionFrom.name} ${collectionTo.name}`
    );
    sql = `CREATE TABLE IF NOT EXISTS ${tableRelation} (\n`;
    sql += `${pkFrom} ${dataTypeFrom} NOT NULL,\n`;
    sql += `${pkTo} ${dataTypeTo} NOT NULL,\n`;
    sql += `PRIMARY KEY (${pkFrom}, ${pkTo}),\n`;
    sql += `FOREIGN KEY (${pkFrom}) REFERENCES ${tableFrom}(${pkFrom}),\n`;
    sql += `FOREIGN KEY (${pkTo}) REFERENCES ${tableTo}(${pkTo})\n`;
    sql += `);`;
  }

  return sql;
};

const generateDataTypeMysql = (field: FieldWithTypes, relationTable: boolean) => {
  let dataType = field.typeField.mysqlDataType;
  if (dataType === "DECIMAL"){
    console.log(field)
  }
  const fieldSettings = field.settings;

  dataType += fieldSettings?.length ? `(${fieldSettings.length})` : "";
  dataType += fieldSettings?.isRequired ? ` NOT NULL` : "";
  dataType += (fieldSettings?.isPK && !relationTable) ? ` PRIMARY KEY` : "";
  dataType += (fieldSettings?.precision && fieldSettings?.scale) ? ` (${fieldSettings.precision},${fieldSettings.scale}) ` : "";
 
  return dataType;
};

const createTableMysql = (collection: CollectionWithAll) => {
  const { name, fields } = collection;
  const nameTable = convertToPascalCase(name);
  let sql = `CREATE TABLE IF NOT EXISTS ${nameTable} (\n`;
  fields.forEach((field) => {
    const dataType = generateDataTypeMysql(field,false);
    const nameField = convertToPascalCase(field.name);
    sql += `${nameField} ${dataType},\n`;
  });
  sql = sql.slice(0, -2);
  sql += `);`;
  return sql;
};

const createSchema = (name: string): string => {
  return `CREATE SCHEMA IF NOT EXISTS ${name};`;
};

const addBreakingLine = (sql: string) => {
  return sql + `\n`;
};

const addComment = (sql: string, comment: string) => {
  return sql + `-- ${comment}\n`;
};

const generateDDL = (draft: DraftWithCollection) => {
  let schemaName = convertToPascalCase(draft.name);
  let ddlStatement = createSchema(schemaName);
  ddlStatement = addBreakingLine(ddlStatement);
  ddlStatement = addBreakingLine(ddlStatement);
  ddlStatement = addComment(
    ddlStatement,
    `Create tables statements for ${schemaName}`
  );
  ddlStatement = addBreakingLine(ddlStatement);
  draft.collections.forEach((collection) => {
    ddlStatement += createTableMysql(collection);
    ddlStatement = addBreakingLine(ddlStatement);
    ddlStatement = addBreakingLine(ddlStatement);
  });

  draft.collections.forEach((collection) => {
    collection.relationCollectionFrom.forEach((relation) => {
      ddlStatement += createRelationMysql(draft.collections, relation);
      ddlStatement = addBreakingLine(ddlStatement);
      ddlStatement = addBreakingLine(ddlStatement);
    });
  });
  return ddlStatement;
};

const convertToPascalCase = (text: string) => {
  return text
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");
};

export { createTableMysql, generateDDL };
