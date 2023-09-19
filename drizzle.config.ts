import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    connectionString: "",
  },
  out: "./out",
} satisfies Config;
