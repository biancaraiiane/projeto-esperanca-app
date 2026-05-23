import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier/flat";
import importHelpersPlugin from "eslint-plugin-import-helpers";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettierConfig,
  {
    plugins: {
      "import-helpers": importHelpersPlugin,
    },
    rules: {
      semi: ["error"],
      quotes: ["error", "double"],
      "@typescript-eslint/no-explicit-any": "off",
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      "import-helpers/order-imports": [
        "warn",
        {
          newlinesBetween: "always",
          groups: [
            ["/^react/", "/^next/", "/@next/"],
            "/components/",
            "module",
            "/^@shared/",
            "/absolute/",
            ["parent", "sibling", "index"],
          ],
          alphabetize: { order: "asc", ignoreCase: true },
        },
      ],
    },
  },
];

export default eslintConfig;
