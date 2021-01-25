// module.exports = {
//   env: {
//     es2020: true
//   },
//   extends: [
//     'nextjs',
//     'plugin:jsx-a11y/recommended',
//     'plugin:cypress/recommended'
//   ],
//   plugins: ['jsx-a11y'],
//   rules: {
//     'import/no-anonymous-default-export': 'error',
//     'import/no-webpack-loader-syntax': 'off',
//     'react/react-in-jsx-scope': 'off', // React is always in scope with Blitz
//     'jsx-a11y/anchor-is-valid': 'off' //Doesn't play well with Blitz/Next <Link> usage
//   }
// }

// module.exports = {
//   env: {
//     es2020: true
//   },
//   extends: [
//     'plugin:jsx-a11y/recommended',
//     'plugin:cypress/recommended',
//     'plugin:react/recommended',
//     'nextjs'
//   ],
//   plugins: ['jsx-a11y'],
//   rules: {
//     'no-param-reassign': 0,
//     'react/jsx-filename-extension': [
//       2,
//       { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
//     ],
//     'import/extensions': 0,

//     'import/no-anonymous-default-export': 'error',
//     'import/no-webpack-loader-syntax': 'off',
//     'react/react-in-jsx-scope': 'off', //"eslint-plugin-baseu"eslint-plugin-baseu React is always in scope with Blitz
//     'jsx-a11y/anchor-is-valid': 'off' //Doesn't play well with Blitz/Next <Link> usage
//   },
//   settings: {
//     'import/resolver': {
//       node: {
//         extensions: ['.js', '.jsx', '.ts', '.tsx']
//       }
//     }
//   }
// }

// module.exports = {
//   env: {
//     // es2020: tru
//     jest: true
//   },
//   extends: [
//     'react-app',
//     'plugin:jsx-a11y/recommended'
//     // 'plugin:cypress/recommended'
//   ],
//   plugins: ['jsx-a11y'],
//   rules: {
//     'import/no-anonymous-default-export': 'error',
//     'import/no-webpack-loader-syntax': 'off',
//     'react/react-in-jsx-scope': 'off', // React is always in scope with Blitz
//     'jsx-a11y/anchor-is-valid': 'off' //Doesn't play well with Blitz/Next <Link> usage
//   }
// }

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'standard',
    'standard-react',
    'plugin:prettier/recommended',
    'prettier/standard',
    'prettier/react',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      legacyDecorators: true,
      jsx: true,
    },
  },
  settings: {
    react: {
      version: '16',
    },
  },
  rules: {
    'space-before-function-paren': 0,
    'react/prop-types': 0,
    'react/jsx-handler-names': 0,
    'react/no-unused-prop-types': 0,
    'import/export': 0,
  },
}
