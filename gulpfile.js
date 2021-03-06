var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('tusk', function () {
    console.log('także tego');
});

gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'expanded'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
});

gulp.task('watch', function () {
    gulp.watch('scss/*.scss', ['sass']);
});