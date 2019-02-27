const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');

rollup({
  input: './src/snowflake-id.js',
  plugins: [babel({ babelrc: false, presets: [ [ 'env', { modules: false, } ] ], plugins: [ 'external-helpers' ], })]
}).then(bundle => {
  return bundle.write({ file: './dist/snowflake-id.js', format: 'umd', name: 'Snowflake-ID', });
});
