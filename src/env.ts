import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
export const env = createEnv({
  server: {
    DATABASE_HOST: z.string(),
    DATABASE_USERNAME: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string(),
  },

  runtimeEnv: process.env,
  skipValidation:
    !!process.env["SKIP_ENV_VALIDATION"] &&
    process.env["SKIP_ENV_VALIDATION"] !== "false" &&
    process.env["SKIP_ENV_VALIDATION"] !== "0",
});
