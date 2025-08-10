import parser from "@typescript-eslint/parser";
import ts from "@typescript-eslint/eslint-plugin";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      prettier,
    },
    rules: {
      ...ts.configs.recommended.rules,
      "prettier/prettier": "error",
      "no-console": "off",
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
