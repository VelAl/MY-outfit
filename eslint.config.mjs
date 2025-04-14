import { FlatCompat } from "@eslint/eslintrc";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    plugins: {
      "simple-import-sort": pluginSimpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            // React & core-libs
            ["^react", "^next", "^@?\\w"],

            // Side effect imports
            ["^\\u0000"],

            // Absolute paths from src or @/
            ["^@/"],

            // Relative imports (first from parent folders, then from the current folder)
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"], // ../
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"], // ./

            // 5. CSS / SCSS and others
            ["\\.css$", "\\.scss$"],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-unused-vars": "off",
    },
  },
];

export default eslintConfig;
