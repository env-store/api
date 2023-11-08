import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: true,
  dts: false,
  splitting: false,
  format: ["esm"],
}));
