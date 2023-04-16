// Конфиг тайпскрипт линта
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  // Правила проверки кода
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "eslint-disable-next-line": 0,
    "eslint-disable-next-line no-undef": 0,
    "@typescript-eslint/no-explicit-any": "off",
  },
};
