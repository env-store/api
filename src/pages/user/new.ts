import z from "zod";
import crypto from "crypto";
import { db } from "@app/db";
import { keys } from "@app/schema";

const bodySchema = z.object({
  fingerprint: z.string(),
  user_id: z.string(),
  pubkey: z.string(),
  pubkey_hash: z.string(),
});

export const POST = async (request: Request) => {
  const body = bodySchema.parse(request.body);

  if (!verify_public_key(body.pubkey, body.pubkey_hash)) {
    return false;
  }

  await db.insert(keys).values({
    fingerprint: body.fingerprint,
    primary_user_id: body.user_id,
    public_key: body.pubkey,
    public_key_hash: body.pubkey_hash,
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
