module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "react/no-unescaped-entities": "off",
    "react-hooks/exhaustive-deps": "off"
  }
};
