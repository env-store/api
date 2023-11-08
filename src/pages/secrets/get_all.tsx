import { db } from "@app/db";
import { secrets } from "@app/schema";
import { eq } from "drizzle-orm";
import { RouteWithParams } from "xirelta";
import { z } from "zod";

const GetAllBody = z.object({
  project_id: z.string(),
});

export const GET: RouteWithParams<"GET", "/secrets/get_all"> = async (request) => {
  const body = GetAllBody.parse(request.query);

  const res = await db
    .select()
    .from(secrets)
    .where(eq(secrets.project_id, body.project_id))
    .execute();

  return JSON.stringify(res);
};
