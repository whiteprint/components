const gulp = require('gulp');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const cleanup  = require('rollup-plugin-cleanup');
const { terser }  = require('rollup-plugin-terser');
const jscc = require('rollup-plugin-jscc');
const postcss = require('gulp-postcss');
const preprocess = require("gulp-preprocess");
const stripComments = require('gulp-strip-comments');
const rename = require("gulp-rename");
const browserSync = require('browser-sync').create();
const selectors = require('./selectors.js');
const postcssImport = require('postcss-import');
const postcssCustomSelectors = require('postcss-custom-selectors');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssAdvancedVariables = require('postcss-advanced-variables');


var fullCSSconfig = [
  postcssImport(),
  require('postcss-mixins'),
  postcssCustomSelectors({
    exportTo: 'selectors.js'
  }),
  postcssCustomProperties({
    preserve: false
  }),
  postcssAdvancedVariables({
    disable: '@mixin, @include, @content, @import'
  }),
  require('postcss-color-function'),
  require('postcss-calc'),
  require('postcss-nesting'),
  require('cssnano')
];

var varsCSSconfig = [
  postcssImport()
];


// process HTML
gulp.task('html', function(done) {
  gulp.src('./src/html/index.html')
    .pipe(preprocess())
    .pipe(gulp.dest("./dist/"));
    done();
});

// copy core CSS
gulp.task('css:core', function(done) {
  gulp.src('./src/css/*/*/*.css')
    .pipe(stripComments.text({
      trim: true
    }))
    .pipe(gulp.dest("./lib/"));
    done();
});

// copy component CSS
gulp.task('css:component', function(done) {
  gulp.src('./src/css/*/*.css')
    .pipe(gulp.dest("./lib/"));
    done();
});

// copy CSS vars
gulp.task('css:vars', function(done) {
  gulp.src('./src/css/[^_]*.css')
    .pipe(stripComments.text({
      trim: true
    }))
    .pipe(gulp.dest("./lib/"));
    done();
});

gulp.task('postcss:vars', function (done) {
  return gulp.src('./src/css/variables.css')
    .pipe(postcss(varsCSSconfig))
    .pipe(gulp.dest('./lib/'));
    done();
});

// process CSS
gulp.task('postcss', function (done) {
  return gulp.src('./src/css/_components.css')
    .pipe(postcss(fullCSSconfig))
    .pipe(rename("components.css"))
    .pipe(gulp.dest('./dist'));
    done();
});

// process JS
gulp.task('buttons:js', () => {
  return rollup.rollup({
    input: './src/js/buttons/buttons.js',
    plugins: [
      jscc({
        values: {
          _SEL: selectors.customSelectors,
          _SEP: ", "
        },
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
    plugins: [
      jscc({
        values: {
          _SEL: selectors.customSelectors,
          _SEP: ", "
        },
      }),
      cleanup()
    ]
  }).then(bundle => {
    return bundle.write({
      file: './lib/dropdowns/index.js',
      format: 'es'
    });
  });
});
gulp.task('components:js', () => {
  return rollup.rollup({
    input: './src/js/_components.js',
    plugins: [
      resolve(),
      terser()
    ]
  }).then(bundle => {
    return bundle.write({
      file: './dist/components.js',
      format: 'umd'
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
  gulp.series(gulp.parallel('css:core', 'css:component')));
});

gulp.task('watch:postcss', function() {
  return gulp.watch(['./src/css/variables.css', './src/css/**/*.css', './src/css/_components.css'],
  gulp.series('postcss'));
});

gulp.task('watch:vars', function() {
  return gulp.watch(['./src/css/_vars.css', './src/css/variables.css'],
  gulp.series('postcss:vars'));
});

gulp.task('watch:html', function() {
  return gulp.watch(['./src/html/**/*.html', './src/html/index.html'],
  gulp.series('html'));
});

gulp.task('watch:js', function() {
  return gulp.watch(['./src/**/*.js', './selectors.js'],
  gulp.series(gulp.parallel('buttons:js', 'dropdowns:js'), 'components:js'));
});

gulp.task('watch:dist', function() {
  return gulp.watch('./dist/**/*',
  gulp.series('reload'));
});

gulp.task('watch', gulp.parallel('watch:css', 'watch:postcss', 'watch:html', 'watch:js', 'watch:dist', 'watch:vars'));

// deafult task
gulp.task('default', gulp.parallel('watch', 'server'));
