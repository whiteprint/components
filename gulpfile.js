const gulp = require('gulp');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const cleanup  = require('rollup-plugin-cleanup');
const jscc = require('rollup-plugin-jscc');
const postcss = require('gulp-postcss');
const injectfiles = require('gulp-inject-multiple-files');
const browserSync = require('browser-sync').create();
const selectors = require('./selectors.js');


// process HTML
gulp.task('html', function(done) {
  gulp.src('./src/index.html')
    .pipe(injectfiles('./src/index.html','./src/html'))
    .pipe(gulp.dest('./dist'));
    done();
});

// process CSS
gulp.task('css', function () {
  return gulp.src('./src/components.css')
    .pipe(postcss())
    .pipe(gulp.dest('./dist'));
});

// process JS
gulp.task('components:js', () => {
  return rollup.rollup({
    input: './src/components.js',
    plugins: [
      jscc({
        values: {
          _SEL: selectors.customSelectors,
          _SEP: ", "
        },
      }),
      resolve(),
      commonjs(),
      cleanup()
    ]
  }).then(bundle => {
    return bundle.write({
      file: './dist/components.js',
      format: 'umd'
    });
  });
});

gulp.task('buttons:js', () => {
  return rollup.rollup({
    input: './src/buttons.js',
    plugins: [
      jscc({
        values: { _SEL: selectors.customSelectors },
      }),
      commonjs(),
      cleanup()
    ]
  }).then(bundle => {
    return bundle.write({
      file: './lib/buttons/index.js',
      format: 'es'
    });
  });
});

gulp.task('dropdowns:js', () => {
  return rollup.rollup({
    input: './src/dropdowns.js',
  }).then(bundle => {
    return bundle.write({
      file: './lib/dropdowns/index.js',
      format: 'es'
    });
  });
});

// dev server
gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    open: false,
    notify: false
  });
});

gulp.task('reload', function(done) {
  browserSync.reload();
  done();
});

// watching
gulp.task('watch:css', function() {
  return gulp.watch(['./lib/**/*.css', './src/components.css'],
  gulp.series('css'));
});

gulp.task('watch:html', function() {
  return gulp.watch(['./src/html/*.html', './src/index.html'],
  gulp.series('html'));
});

gulp.task('watch:dist', function() {
  return gulp.watch('./dist/**/*',
  gulp.series('reload'));
});

gulp.task('watch', gulp.parallel('watch:css', 'watch:html', 'watch:dist'));

// deafult task
gulp.task('default', gulp.parallel('watch', 'server'));
