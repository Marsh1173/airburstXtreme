  
module.exports = {
    root: true,
    env: {
        node: true,
        es2021: true,
    },
    extends: ['eslint:recommended'],
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser', // Specifies the ESLint parser
            parserOptions: {
                ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
                sourceType: 'module', // Allows for the use of imports
            },
            extends: [
                'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
                'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array    ],
            ],
            rules: {
                // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
                // e.g. "@typescript-eslint/explicit-function-return-type": "off",
                'prettier/prettier': [
                    'error',
                    {
                        endOfLine: 'auto',
                    },
                ],
            },
        },
    ],
};