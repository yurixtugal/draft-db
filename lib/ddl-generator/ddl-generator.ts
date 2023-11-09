
import { CollectionWithAll, DraftWithCollection, FieldWithTypes, RelationWithTypes } from "@/types/types";
import slug from "slug";

const RelationWithTypes = {
  SINGLE_RELATION_ONE_TO_MANY: "SINGLE_RELATION_ONE_TO_MANY"
}

const createRelationMysql = (collection: CollectionWithAll[], relation: RelationWithTypes) => {
  console.log(relation)
  let sql = ``;
  const collectionFrom = collection.find((c)=> c.idCollection === relation.idCollectionFrom);
  const collectionTo = collection.find((c)=> c.idCollection === relation.idCollectionTo);
  if (!collectionFrom || !collectionTo) return ``
  const typeRelation = relation.typeRelation;
  const tableFrom = convertToPascalCase(collectionFrom.name);
  const tableTo = convertToPascalCase(collectionTo.name);
  const pkFrom = collectionFrom.fields.find((f) => f.settings.isPK)?.name;
  const pkTo = collectionTo.fields.find((f) => f.settings.isPK)?.name;

  if (typeRelation.staticId === RelationWithTypes.SINGLE_RELATION_ONE_TO_MANY) {
    sql = `ALTER TABLE ${tableTo} ADD CONSTRAINT ${tableTo}_${tableFrom}_fk FOREIGN KEY (${relation.nameFieldSingle}) REFERENCES ${tableFrom}(${pkFrom});`;
  }

  return sql;
}

const generateDataTypeMysql = (field: FieldWithTypes) => {
  let dataType = field.typeField.mysqlDataType;
  const fieldSettings = field.settings;
  
  dataType += fieldSettings?.length ? `(${fieldSettings.length})` : '';
  dataType += fieldSettings?.isRequired ? ` NOT NULL` : '';
  dataType += fieldSettings?.isPK ? ` PRIMARY KEY` : '';
  
  return dataType;
}

const createTableMysql = (collection: CollectionWithAll) => {
  const { name, fields } = collection;
  const nameTable = convertToPascalCase(name);
  let sql = `CREATE TABLE IF NOT EXISTS ${nameTable} (\n`;
  fields.forEach((field) => {
    const dataType = generateDataTypeMysql(field);
    const nameField = convertToPascalCase(field.name);
    sql += `${nameField} ${dataType},\n`;
  });
  sql = sql.slice(0, -2);
  sql += `);`;
  return sql;
}

const createSchema = (name: string): string => {
  return `CREATE SCHEMA IF NOT EXISTS ${name};`
}

const addBreakingLine = (sql: string) => {
  return sql + `\n`;
}

const addComment = (sql: string, comment: string) => {
  return sql + `-- ${comment}\n`;
}


const generateDDL = (draft : DraftWithCollection) => {
  let schemaName = convertToPascalCase(draft.name)
  let ddlStatement = createSchema(schemaName);
  ddlStatement = addBreakingLine(ddlStatement);
  ddlStatement = addBreakingLine(ddlStatement);
  ddlStatement = addComment(ddlStatement, `Create tables statements for ${schemaName}`);
  ddlStatement = addBreakingLine(ddlStatement);
  draft.collections.forEach((collection) => {
    ddlStatement += createTableMysql(collection);
    ddlStatement = addBreakingLine(ddlStatement);
    ddlStatement = addBreakingLine(ddlStatement);
    collection.relationCollectionFrom.forEach((relation) => {
      ddlStatement += createRelationMysql(draft.collections, relation);
    })
  });
  
  return ddlStatement;
}

const convertToPascalCase = (text: string) => {
  return text.split(" ").map((word) => word[0].toUpperCase() + word.slice(1)).join("");
}

export { createTableMysql, generateDDL };