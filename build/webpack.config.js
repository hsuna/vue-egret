const path = require('path');
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const configFactory = function(webpackEnv) {
	const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

	return {
    mode: webpackEnv,
		output: {
      filename: isEnvProduction ? "vue.egret.js" : 'js/vue.egret.js',
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
				},
				{
          test: /\.(css|scss)$/,
          use: ["css-loader", "sass-loader"]
				},
				{
					test: /\.(jpe?g|png|svg|bmp|gif)$/,
          loader: 'url-loader',
          options: {
						limit: 100000
					}
				}
			]
		},
		plugins: [
      new FriendlyErrorsPlugin(),
			isEnvProduction && new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_debugger: true,  
            drop_console: true  
          }
        },
        sourceMap: false,
        parallel: true
      }),
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
				port: 2335,
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
module.exports = configFactory(env)