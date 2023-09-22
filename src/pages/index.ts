import pkg from "../../package.json";

export default async () => new Response(`env-store API v${pkg.version}`);
