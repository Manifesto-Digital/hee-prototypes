// Core dependencies
const gulp = require('gulp');

// External dependencies
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const nodemon = require('gulp-nodemon');

// Version from package.json
const { version } = require('./package.json');

// Local dependencies
const config = require('./app/config');

// Set configuration variables
const port = process.env.PORT || config.port;

// Delete all the files in /public build directory
function cleanPublic() {
  return gulp.src('public', { allowEmpty: true})
  .pipe(clean());
}

// Compile SASS to CSS
function compileStyles() {
  return gulp.src([
    'app/assets/sass/**/*.scss',
    'docs/assets/sass/**/*.scss'
  ])
    .pipe(sass())
    .pipe(gulp.dest('public/css'))
    .on('error', (err) => {
      console.log(err)
      process.exit(1)
    });
}

// Compile JavaScript (with ES6 support)
function compileScripts() {
  return gulp.src([
    'app/assets/javascript/**/*.js',
    'docs/assets/javascript/**/*.js'
  ])
  .pipe(babel())
  .pipe(gulp.dest('public/js'));
}

// Compile assets
function compileAssets() {
  return gulp.src([
    'app/assets/**/**/*.*',
    'docs/assets/**/**/*.*',
    'app/assets/components/**/*.*',
    '!**/assets/**/**/*.js', // Don't copy JS files
    '!**/assets/**/**/*.scss', // Don't copy SCSS files
  ])
  .pipe(gulp.dest('public'));
}

// Start nodemon
function startNodemon(done) {
  const server = nodemon({
    script: 'app.js',
    stdout: false,
    ext: 'scss js html',
    quiet: true,
  });
  let starting = false;

  const onReady = () => {
    starting = false;
    done();
  };

  server.on('start', () => {
    starting = true;
    setTimeout(onReady);
  });

  server.on('stdout', (stdout) => {
    process.stdout.write(stdout);
    if (starting) {
      onReady();
    }
  });
}

function reload() {
  browserSync.reload();
}

// Start browsersync
function startBrowserSync(done){
  browserSync.init({
    proxy: 'localhost:' + port,
    port: port + 1000,
    ui: false,
    files: ['app/views/**/*.*', 'docs/views/**/*.*'],
    ghostmode: false,
    open: false,
    notify: true,
    watch: true,
  }, done);
  gulp.watch("public/**/*.*").on("change", reload);
}

// Watch for changes within assets/
function watch() {
  gulp.watch('app/assets/**/**/*.scss', compileStyles);
  gulp.watch('app/assets/javascript/**/*.js', compileScripts);
  gulp.watch('app/assets/**/**/*.*', compileAssets);
  gulp.watch('app/assets/components/**/*.njk', compileAssets);
  gulp.watch('docs/assets/sass/**/*.scss', compileStyles);
  gulp.watch('docs/assets/javascript/**/*.js', compileScripts);
  gulp.watch('docs/assets/**/**/*.*', compileAssets);
}

exports.watch = watch;
exports.compileStyles = compileStyles;
exports.compileScripts = compileScripts;
exports.cleanPublic = cleanPublic;


// Delete all the files in /dist build directory
function cleanDist() {
  return gulp.src('dist', { allowEmpty: true})
  .pipe(clean());
}

/* Copy main.css under dist/css */
function copyMainCSS() {
  return gulp.src('public/css/main.css')
    .pipe(rename(`nhsuk-${version}.css`))
    .pipe(gulp.dest('dist/css/'));
}

/* Minify main.css and add a min.css suffix */
function minifyMainCSS() {
  return gulp.src('public/css/main.css')
    .pipe(cleanCSS())
    .pipe(rename(`nhsuk-${version}.min.css`))
    .pipe(gulp.dest('dist/css'));
}

/* Copy main.js under dist/js */
function copyMainJS() {
  return gulp.src('public/js/main.js')
    .pipe(gulp.dest('dist/js'));
}

/* Minify main.js file and add a min.js suffix */
function minifyMainJS() {
  return gulp.src('public/js/main.js')
    .pipe(uglify())
    .pipe(rename(`main.min.js`))
    .pipe(gulp.dest('dist/js'));
}

/* Copy nhsuk.js under dist/js with version included in the filename */
function copyNHSUKJS() {
  return gulp.src('node_modules/nhsuk-frontend/dist/nhsuk.js')
    .pipe(rename(`nhsuk-${version}.js`))
    .pipe(gulp.dest('dist/js'));
}

/* Copy nhsuk.min.js under dist/js with version included in the filename */
function copyNHSUKMinJS() {
  return gulp.src('node_modules/nhsuk-frontend/dist/nhsuk.min.js')
    .pipe(rename(`nhsuk-${version}.min.js`))
    .pipe(gulp.dest('dist/js'));
}

// Compile assets
function compileAppAssets() {
  return gulp.src([
    'app/assets/**/**/*.*',
    'node_modules/nhsuk-frontend/packages/assets/**',
    '!**/assets/**/*.njk', // Don't copy component files
    '!**/assets/**/**/*.js', // Don't copy JS files
    '!**/assets/**/**/*.scss', // Don't copy SCSS files
  ])
  .pipe(gulp.dest('dist/assets'));
}

exports.compileAppAssets = compileAppAssets;

gulp.task('build', gulp.series(cleanPublic, compileStyles, minifyMainCSS, compileScripts, compileAssets));
gulp.task('bundle', gulp.series(
  'build',
  cleanDist,
  gulp.parallel(
    gulp.parallel(copyNHSUKJS, copyNHSUKMinJS),
    gulp.series(copyMainCSS, minifyMainCSS),
    gulp.series(copyMainJS, minifyMainJS),
    compileAppAssets)));
gulp.task('default', gulp.series(startNodemon, startBrowserSync, watch));
