// Подключение модулей
const { series, parallel, src, dest } = require("gulp");

// Дополнительный модуль. Он запирает все ошибки в себя, не останавливая работу скрипта
const plumber = require("gulp-plumber");

// POSTCSS делает автопрефиксы
// const postcss = require("gulp-postcss");
// const autoprefixer = require('autoprefixer');

// Минификация CSS
const minify = require("gulp-csso");

// Минификация HTML
const htmlmin = require('gulp-htmlmin');

// Переименование
const rename = require("gulp-rename");

// Оптимизируем изображения
const imagemin = require("gulp-imagemin");

// Минификация SVG-файлов
const svgmin = require("gulp-svgmin");

// Удаление файлов
const del = require('delete');

// Копирование файлов
const copy = require('copy');

function style() {
  return src('./source/css/style.css')
    .pipe(plumber())
    .pipe(dest("./build/css"))   // Кидаем исходник в style.css
    .pipe(minify())                  // минифицируем style.css
    .pipe(rename("style.min.css"))  // вызываем переименование
    .pipe(dest("./build/css"))
}

function htmlmin() {
	return src('./source/**/*.html')
		.pipe(htmlmin())
		.pipe(dest('./build/'))
}

function images() {
	return src('./source/img/**/*')
    .pipe(plumber())
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.jpegtran({progressive: true}),
        imagemin.svgo({
          plugins: [
          {removeViewBox: false},
          {cleanupIDs: false}]
        })
	  ]))
		.pipe(dest("./build/img"))
}

function copyHTML() {
	return src('./source/*.html')
    .pipe(dest('./build/'));
}

function clean(cb) {
  del(['./build/*'], cb);
}

exports.build = series(clean, parallel(htmlmin, style, images));





/* // Описание таска
gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("build/css"))   //Кидаем исходник в style.css
    .pipe(minify())                 //минифицируем style.css
    .pipe(rename("style.min.css"))  //вызываем переименование
    .pipe(gulp.dest("build/css"))   //еще раз кидаем в style.css
    .pipe(server.stream());         //Команда перезагрузки сервера в браузере
});
*/


// Перед тем как таск serve стартует должен быть запущен style
// gulp.task("serve", function() {
  // server.init({       
   // server: "build/",         
  // });
  // gulp.watch("sass/**/*.scss", ["style"]);
  // gulp.watch("*.html", ["html:update"]);
// });
