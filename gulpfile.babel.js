import gulp from 'gulp'
import del from 'del'
import responsive from 'gulp-responsive'
import changed from 'gulp-changed'

/* Paths */
const paths = {
  images: {
    uploadedFiles: 'images/**',
    dist: 'dist/assets/img',
    cache: '.img-cache'
  }
}

/* Images */
const cleanImages = () => del([paths.images.dist])

const buildImages = () => gulp
  .src(paths.images.uploadedFiles)
  .pipe(changed(paths.images.cache))
  .pipe(responsive({
    '**/*.{png,jpg}': [{
      width: 40,
      rename: { suffix: '-lq' },
    }, {
      width: 150,
      rename: { suffix: '-thumb' },
    }, {
      width: 320,
      rename: { suffix: '-320' },
    }, {
      width: 480,
      rename: { suffix: '-480' }
    }, {
      width: 768,
      rename: { suffix: '-768' },
    }, {
      width: 640,
      rename: { suffix: '-640' },
    }, {
      width: 1024,
      rename: { suffix: '-1024' },
    }, {
      width: 1440,
      rename: { suffix: '-1440' },
    }, {
      width: 1600,
      rename: { suffix: '-1600' },
    }, {
      width: 1920,
      rename: { suffix: '-1920' },
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
  .pipe(gulp.dest(paths.images.cache))

const copyImages = () => gulp
  .src([paths.images.cache + '/*'])
  .pipe(gulp.dest(paths.images.dist))

const watchImages = () => gulp
  .watch(paths.images.uploadedFiles, build)

/* Main */
const clean = gulp.parallel(cleanImages)
clean.description = 'clean all'

const build = gulp.series(buildImages, copyImages)
build.description = 'build all sources'

const watch = gulp.series(build, watchImages)
build.description = 'build all sources and watch for changes'

export {
  clean,
  build,
  watch
}

export default build
