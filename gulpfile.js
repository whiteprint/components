const gulp = require('gulp');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const cleanup  = require('rollup-plugin-cleanup');
const jscc = require('rollup-plugin-jscc');
const postcss = require('gulp-postcss');
const preprocess = require("gulp-preprocess");
const stripComments = require('gulp-strip-comments');
const browserSync = require('browser-sync').create();
const selectors = require('./selectors.js');


// process HTML
gulp.task('html', function(done) {
  gulp.src('./src/html/index.html')
    .pipe(preprocess())
    .pipe(gulp.dest("./dist/"));
    done();
});

// clean up CSS
gulp.task('css', function(done) {
  gulp.src('./src/css/**/*')
    .pipe(stripComments.text({
      trim: true
    }))
    .pipe(gulp.dest("./lib/"));
    done();
});

// process CSS
gulp.task('postcss', function () {
  return gulp.src('./src/css/components.css')
    .pipe(postcss())
    .pipe(gulp.dest('./dist'));
});

// process JS
gulp.task('components:js', () => {
  return rollup.rollup({
    input: './src/js/components.js',
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
    input: './src/js/buttons/buttons.js',
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
    input: './src/js/dropdowns/dropdowns.js',
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
  return gulp.watch(['./src/css/**/*.css'],
  gulp.series('css'));
});

gulp.task('watch:postcss', function() {
  return gulp.watch(['./lib/**/*.css', './src/js/components.css'],
  gulp.series('postcss'));
});

gulp.task('watch:html', function() {
  return gulp.watch(['./src/html/**/*.html', './src/html/index.html'],
  gulp.series('html'));
});

gulp.task('watch:js', function() {
  return gulp.watch(['./src/**/*.js', './selectors.js'],
  gulp.series('components:js'));
});

gulp.task('watch:dist', function() {
  return gulp.watch('./dist/**/*',
  gulp.series('reload'));
});

gulp.task('watch', gulp.parallel('watch:css', 'watch:postcss', 'watch:html', 'watch:js', 'watch:dist'));

// deafult task
gulp.task('default', gulp.parallel('watch', 'server'));
