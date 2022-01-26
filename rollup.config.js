import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import scss from 'rollup-plugin-scss';

export default {
  input: './resources/js/home.js',
  output: {
    file: './public/scripts/home.min.js',
    format: 'iife',
    name: 'home.js',
  },
  plugins: [
    nodeResolve(),
    scss({
      output: './public/css/style.min.css',
      outputStyle: 'compressed',
      failOnError: true,
      runtime: require('sass'),
    }),
    copy({
      targets: [
        {
          src: './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
          dest: './public/scripts',
        },
        {
          src: './node_modules/bootstrap/dist/css/bootstrap.min.css',
          dest: './public/css/',
        },
      ],
    }),
  ],
};
