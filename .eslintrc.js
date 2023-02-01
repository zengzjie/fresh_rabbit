module.exports = {
  root: true,
  env: {
    'vue/setup-compiler-macros': true,
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    // eslint-config-prettier 的缩写
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2021
  },
  plugins: [],
  rules: {
    'no-unused-vars': 'off',
    'no-empty': 'off',
    'no-undef': 'off',
    'no-useless-escape': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    'vue/multi-word-component-names': 'off',
    semi: 0,
    trailingComma: 0
  },
  // 定义全局变量
  globals: {
    uni: true,
    wx: true,
    WechatMiniprogram: true,
    UniHelper: true,
    getCurrentPages: true,
    $ref: true
  }
};
