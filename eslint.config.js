import parser from "@typescript-eslint/parser";
import plugin from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        node: true,
        es2021: true,
      },
    },
    plugins: {
      "@typescript-eslint": plugin,
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },
];
