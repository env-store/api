import { RouteWithParams } from "xirelta";

export const POST: RouteWithParams<"/secrets/new"> = async (request) => {
  return new Response("Hello, world!");
};
