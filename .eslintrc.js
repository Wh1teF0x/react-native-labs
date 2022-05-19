module.exports = {
  extends: 'airbnb',
  plugins: [
    'react',
    'react-native',
    'react-hooks'
  ],
  env: {
    jest: true,
    'react-native/react-native': true,
  },
  rules: {
    'react/function-component-definition': 0,
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'padded-blocks': 'off',
    'arrow-body-style': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-single-element-style-arrays': 2,
    'react/jsx-props-no-spreading': 0,
    'react/no-unstable-nested-components': 0,
    'react/jsx-no-constructed-context-values': 0
  },
  globals: {
    fetch: false
  }
};
