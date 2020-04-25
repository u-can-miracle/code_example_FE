const gulp = require('gulp')
const less = require('gulp-less')
const livereload = require('gulp-livereload');

const lessPath = 'src/client/assets/less'
const cssPath = 'dist'
const routesPath = 'src/client/routes'
const compPath = 'src/client/components'
const containersPath = 'src/client/containers'

gulp.task('less', function() {
   return gulp.src(lessPath + '/style.less')
		.pipe(less({ javascriptEnabled: true }))
		.pipe(gulp.dest(cssPath))
		.pipe(livereload({
			host: '0.0.0.0',
			port: 3000,
		}))
		.on('error', console.error.bind(console))
})

gulp.task('watch-less', function() {
	livereload.listen()
  gulp.watch([
		lessPath + '/meta/*',
		lessPath + '/main.less',
		lessPath + '/common.less',
		lessPath + '/antd/*.less',
		lessPath + '/style.less',
		compPath + '/**/*.less',
		routesPath + '/**/*.less',
		containersPath + '/**/*.less'
	], gulp.series('less'))
})
