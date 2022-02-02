import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
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
    commonjs(),
    resolve(),
    uglify(),
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
