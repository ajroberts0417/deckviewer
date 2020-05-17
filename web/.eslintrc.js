module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "rules": {
        "semi": ["error", "never"],
        "quotes": [2, "single"],
        "react/prop-types": 'off',
    },
    settings: {
        react: {
          version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    },
};