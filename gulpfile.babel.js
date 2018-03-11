import gulp from 'gulp'
import del from 'del'
import shell from 'shelljs'
import browsersync from 'browser-sync'
import responsive from 'gulp-responsive'
import { getEnv } from './gulp-tasks/utils'
import changed from 'gulp-changed'
import sass from 'gulp-sass'
import size from 'gulp-size'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cleancss from 'gulp-clean-css'
import when from 'gulp-if'
import uglify from 'gulp-uglify'
import concat from 'gulp-concat'

const env = getEnv()

/* Paths */
const paths = {
  jekyll: {
    site: '_site/',
    doNotWatch: '!(_site|node_modules|.git)/**',
    mdFiles: '**/*.+(md|MD|markdown|MARKDOWN)',
    htmlFiles: '**/*.+(html|xml|xsl|txt)',
    includesFiles: '_includes/*',
    ymlFiles: '**/*.yml',
    pluginsFiles: '_plugins/**',
    assetsImg: 'assets/img',
    assetsStyles: 'assets/styles',
    assetsFonts: 'assets/fonts',
    assetsJs: 'assets/js',
    assetsIcons: 'assets/icons'
  },
  js: {
    folder: '_assets/js',
    files: '_assets/js/**'
  },
  images: {
    folder: '_assets/img',
    files: '_assets/img/**',
    uploadedFiles: 'images/**',
  },
  styles: {
    folder: '_assets/styles',
    files: '_assets/styles/**',
  },
  site: {
    img: '_site/assets/img',
    styles: '_site/assets/styles',
    fonts: '_site/assets/fonts',
    js: '_site/assets/js',
    icons: '_site/assets/icons'
  }
};


/* Jekyll */
const cleanJekyll = () => del([paths.jekyll.site]);

const buildJekyll = (cb) => {
  if (env.dev)
    shell.exec('bundle exec jekyll build --config _config.yml,_config_dev.yml')
  else
    shell.exec('bundle exec jekyll build')
  cb()
}


/* Images */
const cleanImages = () => del([paths.site.img, paths.jekyll.assetsImg])

const copyImages = () => gulp
  .src([paths.images.files])
  .pipe(gulp.dest(paths.site.img))
  .pipe(gulp.dest(paths.jekyll.assetsImg))
  .pipe(when(env.dev, browsersync.stream()))

const resizeImages = () => gulp
  .src(paths.images.uploadedFiles)
  .pipe(changed(paths.jekyll.assetsImg))
  .pipe(responsive({
    '**/*.*': [{
      width: 20,
      rename: { suffix: '-lq' },
    }, {
      width: 150,
      rename: { suffix: '-thumb' },
    }, {
      width: 320,
      rename: { suffix: '-320' },
    }, {
      width: 768,
      rename: { suffix: '-768' },
    }, {
      width: 1024,
      rename: { suffix: '-1024' },
    }, {
      width: '100%',
      rename: { suffix: '' },
    }]
  }, {
      quality: 85,
      progressive: true,
      withMetadata: false,
      errorOnEnlargement: false,
      errorOnUnusedConfig: false
    }))
  .pipe(gulp.dest(paths.site.img))
  .pipe(gulp.dest(paths.jekyll.assetsImg))
  .pipe(when(env.dev, browsersync.stream()))

const buildImages = gulp.parallel(copyImages, resizeImages)


/* JavaScript */
const cleanJs = () => del([paths.site.js, paths.jekyll.assetsJs])

const buildJs = () => gulp
  .src([paths.js.folder + '/**/*.js'])
  .pipe(when('**/gallery/*.js', concat('gallery.js')))
  .pipe(when('**/main/*.js', concat('main.js')))
  .pipe(when(!env.dev, uglify()))
  .pipe(size({ showFiles: true }))
  .pipe(gulp.dest(paths.site.js))
  .pipe(gulp.dest(paths.jekyll.assetsJs))
  .pipe(when(env.dev, browsersync.stream()))


/* Styles */
const cleanStyles = () => del([paths.site.styles, paths.jekyll.assetsStyles])

const buildStyles = () => gulp
  .src([
    paths.styles.folder + '/+(styles_feeling_responsive|atom|rss).scss',
    paths.styles.folder + '/**/*.css'])
  .pipe(sass({ precision: 10 }).on('error', sass.logError))
  .pipe(postcss([autoprefixer({ grid: true })]))
  .pipe(when('**/gallery/*.css', concat('gallery.css')))
  .pipe(when(!env.dev, when('*.css', cleancss())))
  .pipe(size({ showFiles: true }))
  .pipe(gulp.dest(paths.site.styles))
  .pipe(gulp.dest(paths.jekyll.assetsStyles))
  .pipe(when(env.dev, browsersync.stream()))

/* Server */
const reload = (cb) => {
  browsersync.reload()
  cb()
}

const startServer = () => {
  const server = browsersync.create()
  server.init({
    open: false, // do not open a browser
    logFileChanges: true,
    port: 4000,
    server: {
      baseDir: paths.jekyll.site,
    }
  })
  /* Watch Jekyll */
  gulp.watch([
    paths.jekyll.mdFiles,
    paths.jekyll.htmlFiles,
    paths.jekyll.ymlFiles,
    paths.jekyll.includesFiles,
    paths.jekyll.pluginsFiles,
    paths.jekyll.doNotWatch,
  ], gulp.series(buildJekyll, reload))
  /* Watch images */
  gulp.watch([
    paths.images.files,
    paths.images.uploadedFiles
  ], gulp.series(buildImages, reload))
  /* Watch styles */
  gulp.watch([
    paths.styles.files
  ], gulp.series(buildStyles, reload))
  /* Watch JS */
  gulp.watch([
    paths.js.files
  ], gulp.series(buildJs, reload))
}

/* Main */
const clean = gulp.parallel(cleanJekyll, cleanStyles, cleanJs, cleanImages)
clean.description = 'clean all'

const build = gulp.series(clean, buildJekyll, buildStyles, buildJs, buildImages)
build.description = 'build all sources'

const serve = gulp.series(build, startServer)
serve.description = 'serve and watch'

/* Update dependencies */
const updateBundle = (cb) => {
  shell.exec('bundle update')
  cb()
}
const updateYarn = (cb) => {
  shell.exec('yarn upgrade')
  cb()
}
const update = gulp.series(clean, updateBundle, updateYarn)
update.description = 'clean and update dependencies (bundle, yarn)'

export {
  clean,
  build,
  serve,
  update
}

const defaultTasks = env.dev
  ? gulp.series(serve)
  : gulp.series(build)
export default defaultTasks
