import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier'

export default defineConfig([
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // 允许在 effect 中调用 setState（用于初始化外部状态）
      'react-hooks/setState-in-effect': 'off',
      // 允许 ref 赋值（用于回调 ref 模式）
      'react-hooks/refs': 'off',
      // 允许 exhaustive-deps 警告
      'react-hooks/exhaustive-deps': 'warn',
      // 关闭新的 react-hooks 规则
      'react-hooks/react-hooks': 'off',
    },
  },
  {
    ignores: ['dist', 'node_modules', 'coverage', '*.min.js'],
  },
  prettierConfig,
])
