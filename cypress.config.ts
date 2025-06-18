import { defineConfig } from "cypress";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080",
  },
  env: {
    EMAIL: process.env.VITE_EMAIL,
    PASSWORD: process.env.VITE_PASSWORD,
  },
});
