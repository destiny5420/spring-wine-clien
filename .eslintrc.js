module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'no-useless-return': 'off',
    'no-unused-vars': 'off',
    'no-new': 'off',
    'import/no-absolute-path': 'off',
    'vue/no-v-html': 'off',
    'import/no-named-as-default': 'off'
  },
}
