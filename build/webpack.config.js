const webpack = require('webpack');
const path = require('path');
const pkg = require('../package.json')
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')

const configFactory = function(webpackEnv) {
	const isEnvDevelopment = webpackEnv === 'development';
	const isEnvProduction = webpackEnv === 'production';
	const mode = isEnvProduction ? 'production' : 'development';

	return {
    	mode,
		output: {
			filename: {
				development: 'js/vue.egret.js',
				runtime: 'vue.egret.runtime.js',
				production: 'vue.egret.js',
			}[webpackEnv],
			library:'VueEgret',
			libraryTarget:'umd',
			libraryExport: "default",
		},
		resolve: {
			alias: {
				src: path.join(__dirname, '../src')
			},
			extensions: ['.ts', '.js', '.json']
		},
		module: {
	    rules: [
				{
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
				},
				{
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
				}
			]
		},
		optimization: {
			minimize: isEnvProduction,
		},
		plugins: [
			new webpack.BannerPlugin(`VueEgret.js v${pkg.version}\n(c) 2019-${new Date().getFullYear()} Evan You\nReleased under the MIT License.`),
			new webpack.DefinePlugin({
				'process.env': {
					VERSION: JSON.stringify(pkg.version),
					NODE_ENV: JSON.stringify(mode),
				}
			}),
			new FriendlyErrorsPlugin(),
			// copy custom static assets
			isEnvDevelopment && new CopyWebpackPlugin([
				{
					from: path.resolve(__dirname, '../public'),
					to: './',
					ignore: ['.*'],
				}
			])
		].filter(Boolean),
		...(isEnvDevelopment ? {
			devtool: 'cheap-eval-source-map',
			devServer: {
				// contentBase: path.resolve(process.cwd(), 'dist'), //本地服务器所加载的页面所在的目录
				historyApiFallback: true, //不跳转
				host: '0.0.0.0',  // 使用0,0,0,0才可支持外部访问
				port: 9000,
				inline: true, //实时刷新
				// https: true, //支持https
				hot: true, //Enable webpack's Hot Module Replacement feature
				compress: true, //Enable gzip compression for everything served
				overlay: true, //Shows a full-screen overlay in the browser
				stats: 'errors-only', //To show only errors in your bundle
				open: false, //When open is enabled, the dev server will open the browser.
				disableHostCheck: true
			},
		} : {})
	};
};

const env = process.argv.slice(2).includes('--mode=production') 
? 'production' 
: process.argv.slice(2).includes('--mode=development') 
? 'development'
: ''
module.exports = 
	'development' === env
	? configFactory(env)
	:[
		configFactory('runtime'),
		configFactory(env),
	]