import { defineConfig, devices } from '@playwright/test';

// Os testes rodam contra o site já gerado (pasta dist), servido localmente.
export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: 'http://localhost:4321',
    channel: process.env.PW_CHANNEL || undefined,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'computador', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'celular', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'python3 -m http.server 4321 --directory dist',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'ignore',
  },
});
