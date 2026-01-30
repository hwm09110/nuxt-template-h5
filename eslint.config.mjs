// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt([
  {
    ignores: ['types/**/*', 'dist/**/*', '.output/**/*', 'node_modules/**/*', 'nuxt.d.ts'],
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off', // 允许单个单词命名的组件
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'vue/html-self-closing': [
        'warn',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
    },
  },
]);
