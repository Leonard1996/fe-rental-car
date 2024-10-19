import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      'react/react-in-jsx-scope': 'off'
    }
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser
    },
    plugins: {
      react: pluginReact
    },
    rules: {
      ...pluginReact.configs.flat.rules,
      'react/react-in-jsx-scope': false
    }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended
];
