import {
  int,
  text,
  mysqlTable,
  mysqlSchema,
  json,
  varchar,
} from "drizzle-orm/mysql-core";

export const schema = mysqlSchema("env");

export const keys = schema.table("keys", {
  id: int("id").primaryKey().autoincrement().notNull(),
  fingerprint: varchar("fingerprint", {
    length: 255,
  })
    .unique()
    .notNull(),
  primary_user_id: text("primary_user_id").notNull(),
  public_key: text("public_key").notNull(),
  public_key_hash: text("public_key_hash").notNull(),
});

export const secrets = schema.table("secrets", {
  id: int("id").primaryKey().autoincrement().notNull(),
  allowed_keys: json("allowed_keys").notNull(),
  message: text("message").notNull(),
  project_id: text("project_id"),
});

export const projects = schema.table("projects", {
  id: int("id").primaryKey().autoincrement().notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  allowed_keys: json("allowed_keys").notNull(),
});
