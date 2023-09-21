import chalk from "chalk";
import { Logger } from "@imlunahey/logger";
import { Application } from "xirelta";
import z from "zod";
import { db } from "./db";
import { secrets } from "./schema";

const app = new Application({
  logger: new Logger({
    service: "demo",
  }),
  web: {
    port: 3000,
  },
});

try {
  await import("./env");

  await app.start();
} catch (error: unknown) {
  console.error(`${chalk.red("Error")}: ${(error as Error).message}`);
  await app.stop();
  process.exit(1);
}
