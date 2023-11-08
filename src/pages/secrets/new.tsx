import { db } from "@app/db";
import { secrets } from "@app/schema";
import { RouteWithParams } from "xirelta";
import { z } from "zod";

const NewSecretBody = z.object({
  message: z.string(),
  allowed_keys: z.array(z.string()).transform((value) => JSON.stringify(value)),
  project_id: z.string().nullable().optional().default(null),
});

export const POST: RouteWithParams<"GET", "/secrets/new"> = async (request) => {
  const body = NewSecretBody.parse(request.body);

  const res = await db
    .insert(secrets)
    .values({
      message: body.message,
      allowed_keys: body.allowed_keys,
      project_id: body.project_id,
    })
    .execute();

  return JSON.stringify(res);
};
