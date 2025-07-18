import globals from "globals";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginPrettier from "eslint-plugin-prettier";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";
import parserTypeScript from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: parserTypeScript,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      react: pluginReactConfig,
      "react-hooks": pluginReactHooks,
      prettier: pluginPrettier,
      "@typescript-eslint": pluginTypeScript,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginPrettier.configs.recommended.rules,
      ...pluginTypeScript.configs.recommended.rules,
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^" }],
      "@typescript-eslint/no-var-requires": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
