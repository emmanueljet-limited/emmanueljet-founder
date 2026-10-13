import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import accessibility from "eslint-plugin-jsx-a11y";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      ...accessibility.configs.recommended.rules,
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { 'varsIgnorePattern': '^_', 'argsIgnorePattern': '^_' }
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      'import/no-unresolved': 'error',
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal'],
          'pathGroups': [
            {
              'pattern': '@/**',
              'group': 'internal',
              'position': 'after'
            }
          ],
          'pathGroupsExcludedImportTypes': ['builtin'],
          'newlines-between': 'always'
        }
      ],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react/jsx-no-constructed-context-values': 'error',
      'react/jsx-curly-brace-presence': ['error', { 'props': 'never', 'children': 'never' }],
      'react/no-unknown-property': ['error', { ignore: ['class'] }],
      'react/jsx-boolean-value': ['error', 'never'],
      'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
      'func-style': ['error', 'expression', { 'allowArrowFunctions': true }],
      'eol-last': ['error', 'always'],
      'eqeqeq': ['error', 'always'],
      'semi': ['error', 'always'],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'error',
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
      'no-warning-comments': ['error', { 'terms': ['todo', 'fixme'], 'location': 'anywhere' }],
      'no-restricted-syntax': [
        'error',
        {
          'selector': 'Literal[value=/\\s{2,}/]',
          'message': 'String literals should not contain consecutive white spaces.'
        },
        {
          'selector': 'FunctionDeclaration',
          'message': 'Use arrow functions instead of function declarations.'
        }
      ],
      'jsx-a11y/aria-role': ['error', { 'ignoreNonDOM': true }],
      'jsx-quotes': ['error', 'prefer-single'],
      'jsx-a11y/scope': 'error',
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/no-access-key': 'error',
      'jsx-a11y/iframe-has-title': 'error',
      'jsx-a11y/img-redundant-alt': 'error',
      'jsx-a11y/no-redundant-roles': 'error',
      'jsx-a11y/heading-has-content': 'error',
      'jsx-a11y/no-distracting-elements': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
