import gulp from 'gulp'
import del from 'del'
import shell from 'shelljs'
import browsersync from 'browser-sync'
import responsive from 'gulp-responsive'
import { getEnv } from './gulp-tasks/utils'
import changed from 'gulp-changed'

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
  },
  images: {
    files: 'images/**/*.*',
  },
  site: {
    images: '_site/images/',
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
const buildImages = () => gulp
  .src(paths.images.files)
  .pipe(changed(paths.site.images))
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
      errorOnEnlargement: false,
      withMetadata: false,
      errorOnUnusedConfig: false
    }))
  .pipe(gulp.dest(paths.site.images))

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
  ], gulp.series(buildJekyll, buildImages, reload))
  /* Watch images */
  gulp.watch([
    paths.images.files
  ], gulp.series(buildImages, reload))
}

/* Main */
const clean = gulp.parallel(cleanJekyll)
clean.description = 'clean all'

const build = gulp.series(clean, buildJekyll, buildImages)
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
