import { defineConfig } from "vitest/config";
import { loadEnvConfig } from "@next/env";
import { fileURLToPath } from "node:url";

// Load Next.js environment variables (loads .env, .env.local, etc.)
loadEnvConfig(process.cwd());

export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)) } },
  test: {
    environment: "node",
  },
});
