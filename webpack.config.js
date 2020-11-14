/*eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
module.exports = (env = {}) => ({
	mode: "production",
	entry: path.resolve(__dirname, "./src/main.ts"),
	output: {
		path: path.resolve(__dirname, "./dist"),
		publicPath: "/dist/",
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: "vue-loader",
			},
			{
				test: /\.ts$/,
				loader: "ts-loader",
				options: {
					appendTsSuffixTo: [/\.vue$/],
					allowTsInNodeModules: true,
				},
			},
			{
				test: /\.scss$/,
				loader: [
					"style-loader",
					"css-loader",
					"postcss-loader",
					"sass-loader",
				],
			},
			{
				test: /\.styl(us)?$/,
				use: [
					"style-loader",
					"css-loader",
					"postcss-loader",
					{
						loader: "stylus-loader",
						options: {
							import: ["~@edraw/fic-style"],
						},
					},
				],
			},
			{
				enforce: "pre",
				test: /\.(vue|(j|t)sx?)$/,
				exclude: [/node_modules/],
				use: [
					{
						loader: "eslint-loader",
						options: {
							cache: true,
							extensions: [".js", ".jsx", ".vue", ".ts", ".tsx"],
							emitWarning: false,
							emitError: false,
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js", ".vue", ".json"],
	},
	externals: {
		Vue: "vue",
		VueCompositionApi: "@vue/composition-api",
	},
	plugins: [new VueLoaderPlugin()],
	devServer: {
		inline: true,
		hot: true,
		stats: "minimal",
		contentBase: __dirname,
		overlay: true,
	},
});
