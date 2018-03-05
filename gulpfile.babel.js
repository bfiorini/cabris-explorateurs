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
import cssnano from 'gulp-cssnano'
import when from 'gulp-if'

const env = getEnv()

/* Paths */
const paths = {
  jekyll: {
    site: '_site/',
    notSite: '!_site/**/*.*',
    mdFiles: '**/*.+(md|MD|markdown|MARKDOWN)',
    htmlFiles: '**/*.+(html|xml|xsl|txt)',
    includesFiles: '_includes/*',
    ymlFiles: '**/*.yml',
    assetsImg: 'assets/img',
    assetsStyles: 'assets/styles',
    assetsFonts: 'assets/fonts',
    assetsJs: 'assets/js',
    assetsIcons: 'assets/icons'
  },
  images: {
    files: 'images/**/*.*',
  },
  styles: {
    folder: '_assets/styles',
    files: '_assets/styles/**/*.scss',
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

const buildImages = () => gulp
  .src(paths.images.files)
  .pipe(changed(paths.jekyll.assetsImg))
  .pipe(responsive({
    '**/*.*': [{
      width: 20,
      rename: { suffix: '-lq' },
    }, {
      width: '150',
      rename: { suffix: '-thumb' },
    }, {
      width: '100%',
      rename: { suffix: '' },
    }]
  }, {
      quality: 80,
      progressive: true,
      withMetadata: false,
      errorOnEnlargement: false,
      errorOnUnusedConfig: false
    }))
  .pipe(gulp.dest(paths.site.img))
  .pipe(gulp.dest(paths.jekyll.assetsImg))
  .pipe(when(env.dev, browsersync.stream()))


/* Styles */
const cleanStyles = () => del([paths.site.styles, paths.jekyll.assetsStyles])

const buildStyles = () => gulp
  .src([paths.styles.folder + '/+(styles_feeling_responsive|atom|rss).scss'])
  .pipe(sass({ precision: 10 }).on('error', sass.logError))
  .pipe(postcss([autoprefixer({ grid: true })]))
  .pipe(when(!env.dev, when('*.css', cssnano({ autoprefixer: false }))))
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
    paths.jekyll.notSite,
  ], gulp.series(buildJekyll, reload))
  /* Watch images */
  gulp.watch([
    paths.images.files
  ], gulp.series(buildImages, reload))
  /* Watch styles */
  gulp.watch([
    paths.styles.files
  ], gulp.series(buildStyles, reload))
}

/* Main */
const clean = gulp.parallel(cleanJekyll, cleanStyles, cleanImages)
clean.description = 'clean all'

const build = gulp.series(clean, buildJekyll, buildStyles, buildImages)
build.description = 'build all sources'

const serve = gulp.series(build, startServer)
serve.description = 'serve and watch'

export {
  clean,
  build,
  serve
}

const defaultTasks = env.dev
  ? gulp.series(serve)
  : gulp.series(build)
export default defaultTasks
