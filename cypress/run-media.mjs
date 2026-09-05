// Mount the real components in a temporary Next route, never shipped in a build.
import { mkdir, copyFile, rm, access } from "node:fs/promises";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const route = "app/media-test-fixture";
const port = 3219;
let server;
let created = false;
try {
  try { await access(route); throw new Error(`${route} already exists; refusing to overwrite it.`); }
  catch (error) { if (error.code !== "ENOENT") throw error; }
  await mkdir(route);
  created = true;
  await copyFile("cypress/support/media-page.tsx", `${route}/page.tsx`);
  server = spawn("npm", ["run", "dev", "--", "--port", String(port)], {
    stdio: "inherit", env: { ...process.env, MONGODB_URI: "mongodb://127.0.0.1:27017/portfolio_browser_fixture" },
    detached: true,
  });
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    try { if ((await fetch(`http://localhost:${port}/media-test-fixture`)).ok) { ready = true; break; } } catch {}
    await delay(500);
  }
  if (!ready) throw new Error("Next test fixture did not become ready.");
  const cypress = spawn("npm", ["exec", "cypress", "--", "run", "--spec", "cypress/e2e/media.cy.ts",
    "--config", `baseUrl=http://localhost:${port},video=false`], { stdio: "inherit" });
  const code = await new Promise(resolve => cypress.on("exit", resolve));
  process.exitCode = code ?? 1;
} finally {
  if (server?.pid) {
    try { process.kill(-server.pid, "SIGTERM"); } catch {}
    await new Promise(resolve => { server.once("exit", resolve); setTimeout(resolve, 1500); });
  }
  if (created) await rm(route, { recursive: true, force: true });
  if (server) await rm(".next/dev/types", { recursive: true, force: true });
}
