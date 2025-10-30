import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig({
  files: ["**/*.js"],
  languageOptions: {
    globals: {
      ...globals.browser,
      Chart: "readonly", // Aggiungiamo Chart come globale di sola lettura
    },
    sourceType: "script",
  },
  plugins: { js },
  rules: {
    "no-unused-vars": "warn", // Cambia da 'error' (rosso) a 'warn' (giallo)
    "no-undef": "error", // Mantiene come errore se una variabile non è definita
  },
});
