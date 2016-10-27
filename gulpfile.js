/* eslint flowtype/require-valid-file-annotation: 0 */
'use strict'

const gulp = require('gulp')
const eslint = require('gulp-eslint')
const nodemon = require('gulp-nodemon')
const gutil = require('gulp-util')
const rollup = require('gulp-rollup')
const envLoader = require('node-env-file')
const insert = require('gulp-insert')
const flowtype = require('gulp-flowtype')
const removeFlow = require('rollup-plugin-flow')
const newer = require('gulp-newer')

envLoader(`./env.plain`)

const EXIT_ON_ERRORS = process.env.EXIT_ON_ERRORS || false
const nodePrepend = "'use strong'\n"
const flowOptions = {
  abort: process.env.EXIT_ON_ERRORS || false
}

const rollupPlugins = [ removeFlow() ]

const handleErrors = function (err) {
  gutil.log(err)
  this.emit('end')
}

function lint () {
  const stream = gulp.src(['./src/**/*.js'])
  .pipe(newer('./_build/'))
  .pipe(eslint()).pipe(eslint.format())
  if (EXIT_ON_ERRORS) stream.pipe(eslint.failAfterError())
  else stream.on('error', handleErrors)

  return stream
}

function flow () {
  return gulp.src(['./src/**/*.js'])
    .pipe(flowtype(flowOptions))
}
gulp.task('flow', gulp.parallel(flow))

function botRollup () {
  return gulp.src(['./src/**/*.js'])
  .pipe(rollup({
    entry: [ './src/index.js', './src/discord/index.js' ],
    sourceMap: true,
    plugins: rollupPlugins
  }))
  .pipe(newer('./_build/'))
  .pipe(insert.prepend(nodePrepend))
  .on('error', handleErrors)
  .pipe(gulp.dest('./_build/'))
}
gulp.task('botRollup', botRollup)

const all_tasks = gulp.parallel([
  botRollup, lint
])
gulp.task('default', all_tasks)
gulp.task('lint', lint)
gulp.task('rollup', botRollup)

gulp.task('watch', gulp.series(all_tasks, () => {
  nodemon({
    script: './_build/index.js',
    ext: '.js',
    watch: [
      'src/**/*.js', 'env.plain'
    ],
    tasks: ['botRollup', 'lint']
  })
}))
