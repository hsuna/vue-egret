const path = require('path');
const alias = require('@rollup/plugin-alias');
const commonjs = require('@rollup/plugin-commonjs');
const analyze = require('rollup-plugin-analyzer');
const typescript = require('@rollup/plugin-typescript');
const babel = require('rollup-plugin-babel');
const replace = require('@rollup/plugin-replace');
const strip = require('rollup-plugin-strip');
const resolve = require('rollup-plugin-node-resolve');
const copy = require('rollup-plugin-copy');
const { terser } = require('rollup-plugin-terser');

const config = require('./config');

const options = [
  /** umd版本 */
  {
    input: 'src/entry.ts',
    name: 'vue-egret.js',
    format: 'umd',
    analyze: true,
    exports: 'default',
  },
  /** umd版本 */
  {
    input: 'src/entry.ts',
    name: 'vue-egret.min.js',
    format: 'umd',
    minimize: true,
    exports: 'default',
    copyList: [
      { src: 'dist/vue-egret.min.js', dest: 'docs/.vuepress/public/lib' }
    ]
  },
  /** commonjs版本 */
  {
    input: 'src/entry.ts',
    name: 'vue-egret.common.js',
    format: 'cjs',
    exports: 'auto',
  },
  /** ems版本 */
  {
    input: 'src/index.ts',
    name: 'vue-egret.esm.js',
    format: 'esm',
    exports: 'named',
  },
];

module.exports = options.map((option) => {
  return {
    input: option.input,
    output: {
      name: config.name,
      file: `dist/${option.name}`,
      format: option.format,
      exports: option.exports,
      banner: config.banner,
      globals: {
        'egret': 'egret'
      },
      plugins: [option.minimize && terser()].filter(Boolean),
    },
    onwarn(warning, warn) {
      // skip certain warnings
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;

      // throw on others
      // if (warning.code === 'NON_EXISTENT_EXPORT') throw new Error(warning.message);

      // Use default for everything else
      warn(warning);
    },
    external: ['egret'],
    plugins: [
      alias({
        resolve: ['.js', '.ts'],
        entries: [
          {
            find: /^src/,
            replacement: path.join(__dirname, '..', 'src'),
          }
        ]
      }),
      resolve({
        extensions: ['.js', '.ts'],
      }),
      replace({
        'process.env.VERSION': JSON.stringify(config.version),
        'process.env.NODE_ENV': JSON.stringify(config.mode),
      }),
      typescript(),
      babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.ts'],
        runtimeHelpers: true,
      }),
      commonjs(),
      strip({
        // set this to `false` if you don't want to
        // remove debugger statements
        debugger: true,

        // defaults to `[ 'console.*', 'assert.*' ]`
        functions: ['console.log', 'assert.*'],

        // set this to `false` if you're not using sourcemaps
        // defaults to `true`
        // sourceMap: true
      }),
      option.analyze && analyze({
        summaryOnly: true,
      }),
      option.copyList && copy({
        targets: option.copyList
      })
    ].filter(Boolean),
  };
});
