module.exports = {
  extends: 'airbnb-typescript-prettier',
  settings: {
    react: {
      version: '16.8.0',
    },
  },
  rules: {
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off', // hooks is preferred
    'import/no-unresolved': [2, { ignore: ['@infinitex/autocomplete'] }],
    'jsx-a11y/mouse-events-have-key-events': 'warn',
    'jsx-a11y/no-noninteractive-element-interactions': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
  },
  ignorePatterns: ['.eslintrc.js', '**/node_modules/*', '**/lib/*', '**/dist/*', 'webpack.config.ts'],
};
