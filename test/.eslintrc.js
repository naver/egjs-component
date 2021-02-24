module.exports = {
  "extends": [
    "../.eslintrc.js"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.eslint.json",
    "sourceType": "module"
  },
  "rules": {
    "max-classes-per-file": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/unbound-method": "off",
    "@jsdoc/check-indentation": "off"
  }
};
