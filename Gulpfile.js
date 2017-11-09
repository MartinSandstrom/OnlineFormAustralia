var gulp = require('gulp');
var ghpages = require('gh-pages');

gulp.task('deploy', function() {
  return ghpages.publish('dist/**/*', function(err) {});
});
