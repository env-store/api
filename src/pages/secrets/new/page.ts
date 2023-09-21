import { db } from "@app/db";
import { secrets } from "@app/schema";
import { z } from "zod";

const newSecretBody = z.object({
  allowed_keys: z.array(z.string()),
  message: z.string(),
  project_id: z.string().nullable(),
});

export default async (request: Request) => {
  const body = newSecretBody.parse(request.body);

  console.log(body);

  return "jello world";

  // const res = await db.insert(secrets).values({
  //   allowed_keys: body.allowed_keys,
  //   message: body.message,
  //   project_id: body.project_id,
  // });

  // return res;
};
