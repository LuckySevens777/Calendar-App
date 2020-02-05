// Constants
const SOURCE_DIRECTORY = 'src',
      MID_DIRECTORY    = 'intermediate',
      BUILD_DIRECTORY  = 'serve'

// Imports
const browserify = require('browserify'),
      del        = require('del'),
      ejs        = require('gulp-ejs'),
      extReplace = require('gulp-ext-replace'),
      gulp       = require('gulp'),
      replace    = require('gulp-replace'),
      sass       = require('gulp-sass'),
      shell      = require('gulp-shell'),
      tap        = require('gulp-tap'),
      typescript = require('gulp-typescript')

// Compile TypeScript
gulp.task('compileTypescript', () =>
    gulp.src([`${SOURCE_DIRECTORY}/ts/**/*.ts*`])
    .pipe(typescript({
        module: 'commonjs',
        jsx: 'react'
    }))
    .pipe(replace('var React = require("react");', ''))
    .pipe(replace('var ReactDOM = require("react-dom");', ''))
    .pipe(extReplace('.js'))
    .pipe(gulp.dest(MID_DIRECTORY))
)

// Browserify
gulp.task('browserify', () =>
    gulp.src([`${MID_DIRECTORY}/**/*.js`])
    .pipe(tap((file) => {
        file.contents = browserify(file.path, {debug: true}).bundle();
    }))
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

// Generate TypeScript documentation
gulp.task('typedoc', shell.task('./node_modules/typedoc/bin/typedoc --out docs-frontend/ src/ts/ --jsx react')
)

// Default Task
gulp.task('default', gulp.series(
    'clean',
    ['compileTypescript', 'copyHTML', 'copyCSS'],
    'browserify',
    'typedoc'
))
