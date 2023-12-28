module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'simple-import-sort'],
    settings: {
        react: {
            version: 'detect'
        },
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.ts', '.tsx']
            }
        }
    },
    env: {
        browser: true,
        amd: true,
        node: true
    },
    extends: [
        "next/core-web-vitals",
        'plugin:@typescript-eslint/recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended'
    ],
    rules: {
        'prettier/prettier': ['error', {tabWidth: 1, useTabs: true}, {usePrettierrc: true}],
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/accessible-emoji': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['hrefLeft', 'hrefRight'],
                aspects: ['invalidHref', 'preferButton']
            }
        ]
    }
};
