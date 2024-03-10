/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/eslint-config-typescript'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        "semi": "error",
        "no-multiple-empty-lines": [
            "error",
            {
                "max": 1
            }
        ],
        "brace-style": [
            "error",
            "1tbs"
        ],
        "eol-last": [
            "error",
            "always"
        ],
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "no-trailing-spaces": "error",
        "padded-blocks": [
            "error",
            {
                "classes": "never"
            }
        ],
        "id-match": [
            "error",
            "^[a-zA-Z0-9-_]+$"
        ],
        "vue/html-indent": [
            "error",
            4
        ]
    }
};
