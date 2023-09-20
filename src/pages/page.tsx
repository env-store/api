import z from "zod";
import crypto from "crypto";
import { db } from "../db";
import { keys } from "../schema";

const bodySchema = z.object({
  fingerprint: z.string(),
  primary_user_id: z.string(),
  public_key: z.string(),
  public_key_hash: z.string(),
});

export default async (request: Request) => {
  const b = request.body;

  const c = bodySchema.parse(b);

  const verifier = crypto.createHash("sha512");
  verifier.update(c.public_key);

  const hashed = verifier.digest("hex").toUpperCase();
  const verified = hashed === c.public_key_hash.toUpperCase();

  await db.insert(keys).values({
    fingerprint: c.fingerprint,
    primary_user_id: c.primary_user_id,
    public_key: c.public_key,
    public_key_hash: c.public_key_hash,
  });

  return true;
};
