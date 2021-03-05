const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
const glob = require('glob');

const entries = function () {
  let map = {};
  Object.values(glob.sync(path.resolve(__dirname, '../packages/*/index.ts'))).forEach(
    (filepath) => {
      map[path.basename(path.dirname(filepath))] = filepath;
    },
  );
  return map;
};

module.exports = {
  mode: 'development',
  entry: entries(),
  output: {
    path: path.resolve(__dirname, '../libs'),
    filename: '[name]/index.js',
    library: '[name]',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this',
  },
  resolve: {
    alias: {
      src: path.join(__dirname, '../src'),
    },
    extensions: ['.ts', '.js', '.json'],
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
    ],
  },
  optimization: {
    minimize: false,
  },
  plugins: [new FriendlyErrorsPlugin()],
};
