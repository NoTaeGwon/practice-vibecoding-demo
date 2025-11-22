import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  use: {
    // Windows 환경에서 localhost가 IPv6(::1)로만 바인딩될 수 있어,
    // baseURL은 127.0.0.1 대신 localhost로 사용
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});


