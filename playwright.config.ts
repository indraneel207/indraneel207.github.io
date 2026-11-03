import {defineConfig} from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    channel: process.env.CI ? undefined : "chrome",
    colorScheme: "light",
    trace: "retain-on-failure"
  },
  webServer: {
    command: "npm run preview -- --port 4173 --ignore-lock",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI
  }
});
