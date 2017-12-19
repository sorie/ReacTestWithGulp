//
// sasstest gulpfile
//-----------------------------------------------------------

//== gulp Module
var gulp          = require('gulp'),
    concat        = require('gulp-concat'),
    pug           = require('gulp-pug'),
    sass          = require('gulp-sass'),
    watch         = require('gulp-watch'),
    livereload    = require('gulp-livereload'),
    connect       = require('gulp-connect'),
    open          = require('gulp-open'),
    sourcemaps    = require('gulp-sourcemaps')
    babel         = require('gulp-babel');

//== config.json
//
//## src,dest variables
var src       = {
  sass        : './src/sass/*.sass',
  pug         : './src/pug/**/*.pug',
  js          : "./src/js/*.js"
}
var dest      = {
  css         : './assets/css/',
  html        : './assets/html/',
  js          : "./assets/js/"
}

//## gulp task Live, Open Enviroment
var config    = {
  output      : "./assets",
  input       : "./dest",
  port        : 8888,
  livereload  : true,
  browser     : "chrome"
}

//## sass option style ...
var sassOpt = {
  //** outputStype : nested,expanded,compact,compressed
  outputStyle     : "compact",
  //** indentType : space, tab
  indentType      : "space",
  //** indentWidth : default: 2
  indentWidth     : 1,
  //** 컴파일 된 css의 소수점 자리수 : default: 5
  precision       : 6,
  //** sourceComments T/F : default: false
  sourceComments  : false
}
//## pug option style ...
var pugOpt  = {
  pretty          : "\t"
}

//== gulp task
//
//## gulp basic task : you say just gulp~~!
gulp.task('default',['PugCompile','SassCompile','babel','Live','Open','Watch']);

//## concat, pug/sass compile...
gulp.task('Concat', function(){
  return gulp
  .src(src.js)
  .pipe(concat("common.js"))
  .pipe(gulp.dest(dest.js));
});

//## pug to html
gulp.task('PugCompile',function(){
  return gulp
  .src(src.pug)
  .pipe(pug(pugOpt))
  .pipe(gulp.dest(dest.html));
});

//## sass to css
gulp.task('SassCompile',function(){
  return gulp
  .src(src.sass)
  .pipe(sourcemaps.init())
  .pipe(sass(sassOpt).on('error', sass.logError))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest(dest.css));
});

//## babel conpile
gulp.task('babel',function(){
  return gulp
  .src(src.js)
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest(dest.js));
})

//## livereload
gulp.task('Live',function(){
  connect.server({
    root        : config.output,
    port        : config.port,
    livereload  : config.livereload
  });
});

//## browser open
gulp.task('Open',function(){
  var options = {
    uri : 'http://localhost:' + config.port,
    app : config.browser
  };
  gulp.src(config.output+'/html/')
  .pipe(open(options));
});

//## html livereload
gulp.task('Html', function () {
  gulp.src(dest.html+'*.html')
    .pipe(connect.reload());
});
//## css livereload
gulp.task('Css', function () {
  gulp.src(dest.css+'*.css')
    .pipe(connect.reload());
});
//## js livereload
gulp.task('js', function () {
  gulp.src(dest.js+'*.js')
    .pipe(connect.reload());
});

//## watch js,pug,sass in my workspace
gulp.task('Watch',function(){
  // gulp.watch(src.js,['Concat']);
  gulp.watch(src.pug,['PugCompile']);
  gulp.watch(src.sass,['SassCompile']);
  gulp.watch(src.js,['babel']);
  gulp.watch([dest.html+'*.html'],['Html']);
  gulp.watch([dest.css+'*.css'],['Css']);
  gulp.watch([dest.js+'*.js'],['js']);
});
