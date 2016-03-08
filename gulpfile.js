var gulp = require('gulp');
var less = require('gulp-less');

var paths = {
    less: './public/css/*.less'
};

gulp.task('less', function() {
    gulp.src(paths.less)
        .pipe(less())
        .pipe(gulp.dest('./public/css/'))
});

gulp.task('default', function() {
    gulp.watch(paths.less, ['less']);
});