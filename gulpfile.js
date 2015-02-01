var gulp = require('gulp');
var cp = require('child_process');

gulp.task('default', ['6to5-node', 'watch'])

gulp.task('watch', function () {
  gulp.watch('./index.js', ['6to5-node'])
})

gulp.task('6to5-node', function () {
  cp.spawn('6to5-node', ['index.js'], {stdio: 'inherit'})
})
