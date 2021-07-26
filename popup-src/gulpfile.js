const gulp = require('gulp');
const del = require('del');
const lint = require('gulp-eslint');
const process = require('process');

const { src, dest, pipe, series } = gulp;

function clean(cb) {
  del.sync(['../popup/**', '!../popup'], {
    force: true,
  });
  cb();
}

function copy(cb) {
  return src(['template/**']).pipe(dest('../popup'));
}

function linter() {
  return src(['src/**/*.js', 'src/**/*.jsx']).pipe(lint()).pipe(lint.format());
}

exports.dev = series(clean, copy);
exports.prod = series(clean, copy);
