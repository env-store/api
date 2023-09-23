import { RouteWithParams } from "xirelta";
import z from "zod";

const GetProjectVariables = z.object({
  projectId: z.string(),
});

export const POST: RouteWithParams<"/secrets/new"> = async (req) => {
  const body = GetProjectVariables.parse(req.body);

  return true;
};
