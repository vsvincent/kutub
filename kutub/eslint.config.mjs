import globals from 'globals'
import eslint from '@eslint/js'
// import tseslint from '@typescript-eslint'
import tseslintPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import pluginReact from 'eslint-plugin-react'
import pluginPrettier from 'eslint-plugin-prettier'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  eslint.configs.recommended,
  // ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
    },
    rules: {
      '@stylistic/js/semi': ['error', 'never'],
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/max-len': ['error', 100],
      '@stylistic/js/comma-spacing': ['error'],
      '@/no-unused-vars': 2,
      '@/no-var': 2,
      'no-console': 1,
    },
    plugins: {
      react: pluginReact,
      js: eslint,
      ts: tseslintPlugin,
      prettier: pluginPrettier,
      '@stylistic/js': stylisticJs
    },
  },
]