require('./gulp/tasks/html');
require('./gulp/tasks/styles');
require('./gulp/tasks/scripts');
require('./gulp/tasks/img');
require('./gulp/tasks/watch');
require('./gulp/tasks/svg');
require('./gulp/tasks/modernizr');
require('./gulp/tasks/build');
require('./gulp/tasks/deploy');


var gulp = require('gulp');


gulp.task('default', ['watch']);
