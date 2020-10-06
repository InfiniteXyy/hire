module.exports = {
  extends: 'airbnb-typescript-prettier',
  settings: {
    react: {
      version: 'latest',
    },
  },
  rules: {
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
  },
  ignorePatterns: ['.eslintrc.js', '**/node_modules/*', '**/lib/*', 'webpack.config.ts'],
};
