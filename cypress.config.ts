import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://termintool.vercel.app/',
    projectId: "mjib5t",
    experimentalStudio: true,
    defaultCommandTimeout: 10000,
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
