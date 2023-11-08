import { Logger } from "@imlunahey/logger";
import chalk from "chalk";
import { Application } from "xirelta";

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
