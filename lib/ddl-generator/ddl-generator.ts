
import { CollectionWithAll, DraftWithCollection } from "@/types/types";
import slug from "slug";



const createTable = (collection: CollectionWithAll) => {
  const { name, fields } = collection;
  let sql = `CREATE TABLE IF NOT EXISTS ${name} (`;
  fields.forEach((field) => {
    sql += `${field.name} ${field.typeField.name},`;
  });
  sql = sql.slice(0, -1);
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
  let ddlStatement = createSchema(convertToPascalCase(slug(draft.name)));
  ddlStatement = addBreakingLine(ddlStatement);
  ddlStatement = addBreakingLine(ddlStatement);
  ddlStatement = addComment(ddlStatement, `Create tables statements for ${draft.name}`);
  ddlStatement = addBreakingLine(ddlStatement);
  draft.collections.forEach((collection) => {
    ddlStatement += createTable(collection);
    ddlStatement = addBreakingLine(ddlStatement);
    ddlStatement = addBreakingLine(ddlStatement);
  });
  return ddlStatement;
}

const convertToPascalCase = (str: string) => {
  return str.replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
}

export { createTable, generateDDL };