import z from "zod";
import crypto from "crypto";
import { db } from "@app/db";
import { keys } from "@app/schema";

const bodySchema = z.object({
  fingerprint: z.string(),
  primary_user_id: z.string(),
  public_key: z.string(),
  public_key_hash: z.string(),
});

export default async (request: Request) => {
  console.log(request.body);
  if (0 == 0) return new Response("ok");

  const body = bodySchema.parse(request.body);

  if (!verify_public_key(body.public_key, body.public_key_hash)) {
    return false;
  }

  await db.insert(keys).values({
    fingerprint: body.fingerprint,
    primary_user_id: body.primary_user_id,
    public_key: body.public_key,
    public_key_hash: body.public_key_hash,
  });

  return true;
};

function verify_public_key(pubkey: string, hash: string) {
  const verifier = crypto.createHash("sha512");
  verifier.update(pubkey);

  const hashed = verifier.digest("hex").toUpperCase();
  const verified = hashed === hash.toUpperCase();

  return verified;
}
