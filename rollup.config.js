import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy';

const copyConfig = {
  targets: [
    { src: 'node_modules/@webcomponents', dest: '_site/assets/js'}
  ]
};

const config = {
  input: 'assets/js/bundle.js',
  output: {
    dir: '_site/assets/js',
    format: 'es',
  },
  plugins: [
    minifyHTML(),
    copy(copyConfig),
    resolve(),
  ],
  preserveEntrySignatures: false
}

if (process.env.NODE_ENV !== 'development') {
  config.plugins.push(terser());
}

export default config;
