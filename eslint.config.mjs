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
    sourceType: "module",
  },
  plugins: { js },
  rules: {
    "no-unused-vars": "off", // Disattiva completamente il controllo sulle variabili non usate
    "no-undef": "error", // Mantiene come errore se una variabile non è definita
  },
});
