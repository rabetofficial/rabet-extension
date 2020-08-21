/* eslint-disable */

const gulp = require('gulp');
const del = require('del');
const lint = require('gulp-eslint');

gulp.task('clean', cb => {
  del.sync([
    '../popup/**',
    '!../popup',
  ], {
    force: true,
    }
  );

  cb();
});

gulp.task('copy', gulp.series('clean', (cb) => {
  gulp.src([
    'template/**',
  ])
  .pipe(gulp.dest('../popup'));

  cb();
}));

gulp.task('lint', () =>
  gulp.src(['src/**/*.js', 'src/**/*.jsx'])
  .pipe(lint())
  .pipe(lint.format())
);

gulp.task('dev', gulp.series('copy'));
gulp.task('prod', gulp.series('lint', 'copy'));
