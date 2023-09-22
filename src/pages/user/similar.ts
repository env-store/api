import { db } from "@app/db";
import { keys } from "@app/schema";
import z from "zod";

import { eq, ne, gt, gte } from "drizzle-orm";

const GetSimilarUserBody = z.object({
  primary_id: z.string(),
});

export const POST = async (request: Request) => {
  const body = GetSimilarUserBody.parse(request.body);

  const data = await db
    .select()
    .from(keys)
    .where(eq(keys.primary_user_id, body.primary_id));

  return data;
};
