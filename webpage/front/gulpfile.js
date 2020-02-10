// Constants
const SOURCE_DIRECTORY = 'src',
      BUILD_DIRECTORY  = 'serve'

// Imports
const extReplace = require('gulp-ext-replace'),
      del        = require('del'),
      ejs        = require('gulp-ejs'),
      gulp       = require('gulp'),
      sass       = require('gulp-sass'),
      typescript = require('gulp-typescript')

// Compile TypeScript
gulp.task('compileTypescript', () =>
    gulp.src([`${SOURCE_DIRECTORY}/ts/**/*.ts`])
    .pipe(typescript())
    .pipe(extReplace('.js'))
    .pipe(gulp.dest(BUILD_DIRECTORY))
)

// Compile ejs
gulp.task('copyHTML', () =>
    gulp.src([`${SOURCE_DIRECTORY}/ejs/*.ejs`])
    .pipe(ejs())
    .pipe(extReplace('.html'))
    .pipe(gulp.dest(BUILD_DIRECTORY))
)

// Compile SCSS
gulp.task('copyCSS', () =>
    gulp.src([`${SOURCE_DIRECTORY}/scss/style.scss`])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(BUILD_DIRECTORY))
)

// Clean Build Directory
gulp.task('clean', () =>
    del(`${BUILD_DIRECTORY}/**`)
)

// Default Task
gulp.task('default', gulp.series(
    'clean',
    ['compileTypescript', 'copyHTML', 'copyCSS']
))
