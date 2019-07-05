const gulp = require('gulp')//找到gulp包  
      htmlmin = require('gulp-htmlmin')//引入压缩html插件
      gulpSass = require('gulp-sass')//引入将sass转化成css的插件
      cleanCss = require('gulp-clean-css')//引入压缩css的插件
      babel = require('gulp-babel')//引入将ES6转化为ES5的插件
      uglify = require('gulp-uglify')//引入压缩js插件
      connect = require('gulp-connect');//引入服务器的插件
//制定html任务
gulp.task('html',()=>{
    //src 获取目标源文件
    //pipe管道  是文件传输的过程，在过程中对文件做处理
    //dest  目标的  将解析后的文件传输到目标文件（上线的文件）
    gulp.src('src/**/*.html')
        .pipe(htmlmin({
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true//删除<style>和<link>的type="text/css"
        })) 
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());   
})
//制定css任务
gulp.task('css',()=>{
    gulp.src('src/css/**/*.scss')
        .pipe(gulpSass())//先转换成css
        .pipe(cleanCss())//对css进行压缩
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
})
//制定js任务
gulp.task('js', () => {
    // 所有js代码取出来，ES6转成ES5  babel
    // 压缩，再放到dist/js里
    gulp.src('src/js/**/*')
           .pipe(babel({
               presets: ['@babel/env']
           }))
          .pipe(uglify())
          .pipe(gulp.dest('dist/js'))
          .pipe(connect.reload());
  })
//制定图片任务
gulp.task('images',()=>{
    gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images'))
})
//制定libs任务
gulp.task('libs',()=>{
    gulp.src('src/libs/**/*')
        .pipe(gulp.dest('dist/libs'))
})
//制定一个开启服务的任务
gulp.task('server',()=>{
    connect.server({
        root :"dist",
        port : 3000,
        livereload: true
    });
})
//制定一个监听任务
gulp.task('watch',()=>{
    //一旦html文件作出修改，马上执行 ‘html’任务
    gulp.watch('src/**/*.html',['html']);
    //一旦scss文件作出修改，马上执行 ‘css’任务
    gulp.watch('src/css/**/*.scss',['css']);
    //一旦js文件作出修改，马上执行 ‘js’任务
    gulp.watch('src/js/**/*',['js']);

})
//把任务集中执行，就不用一步一步分开的去执行各个任务
gulp.task('default',["html","css","js","images","libs","server","watch"]);