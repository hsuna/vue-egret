const webpack = require('webpack');
const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./config.js');

const configFactory = function (options = {}) {
	return {
		mode: 'development',
		output: {
			filename: 'js/vue-egret.js',
			library: config.name,
			libraryTarget: 'umd',
			libraryExport: 'default',
		},
		resolve: {
			alias: {
				src: path.join(__dirname, '..', 'src')
			},
			extensions: ['.ts', '.js', '.json'],
		},
		module: {
			rules: [{
					test: /\.(ts|tsx)$/,
					exclude: /node_modules/,
					loader: 'ts-loader',
				},
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
			],
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					VERSION: JSON.stringify(config.version),
					NODE_ENV: JSON.stringify(config.mode),
				},
			}),
			new FriendlyErrorsPlugin(),
			// copy custom static assets
			new CopyWebpackPlugin([{
				from: path.resolve(__dirname, '../test/public'),
				to: './',
				ignore: ['.*'],
			}, ]),
		],
		devtool: 'cheap-eval-source-map',
		devServer: {
			// contentBase: path.resolve(process.cwd(), 'dist'), //本地服务器所加载的页面所在的目录
			historyApiFallback: true, //不跳转
			host: 'localhost', // 使用0,0,0,0可支持外部访问
			port: 9000,
			inline: true, //实时刷新
			// https: true, //支持https
			hot: true, //Enable webpack's Hot Module Replacement feature
			compress: true, //Enable gzip compression for everything served
			overlay: true, //Shows a full-screen overlay in the browser
			stats: 'errors-only', //To show only errors in your bundle
			open: false, //When open is enabled, the dev server will open the browser.
			disableHostCheck: true,
		},
		...options,
	};
};

module.exports = [
	configFactory(),
	configFactory({
		entry: './test/main.js',
		output: {
			filename: "js/main.js",
		},
		externals: {
			'egret': 'egret',
			'assetsmanager': 'RES',
			'vue-egret': 'VueEgret',
		},
	}),
]