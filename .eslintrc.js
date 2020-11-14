module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		// "plugin:vue/essential",
		"plugin:vue/strongly-recommended",
		"eslint:recommended",
		"plugin:prettier-vue/recommended",
		"@vue/typescript/recommended",
		// "@vue/prettier",
		"@vue/prettier/@typescript-eslint"
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	settings: {
		"prettier-vue": {
			// ignoring template tag
			SFCBlocks: {
				template: false
			}
		}
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"@typescript-eslint/camelcase": "off",
		"prettier-vue/prettier": [
			"warn",
			{
				semi: true,
				"trailingComma": "all",
				useTabs: true,
				tabWidth: 4
			}
		],
		"vue/max-attributes-per-line": [
			"warn",
			{
				singleline: 1,
				multiline: {
					max: 1,
					allowFirstLine: false
				}
			}
		],
		"vue/html-indent": [
			"error",
			"tab",
			{
				baseIndent: 1
			}
		]
	}
};
