/*
 * Temporary gulp builder to automatically convert html's to jsp's
 */
'use strict';

var glob = require('glob-all'),
    gulp = require('gulp'),
    inject = require('gulp-inject-string'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    //uglify = require('gulp-uglify'),
    ignore = require('gulp-ignore'),
    shell = require('gulp-shell'),
    //sass = require('node-sass'),
    compass = require('gulp-compass'),
    path = require('path'),
    webpack = require('webpack-stream'),
    del = require('del');

var PATHS = {
    build: './build',
    deploy: './deploy'
};

var JS = {
    app: glob.sync([
        // Libs
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './source/javascripts/libs/dotdotdot.js',
        './source/javascripts/libs/select.js',
        './source/javascripts/libs/modernizr',
        './source/javascripts/libs/jrespond.js',
        './source/javascripts/libs/jquery-ui-1.10.4.custom.js',
        './source/javascripts/libs/jquery.knob.js',
        './source/javascripts/libs/easing.js',
        './source/javascripts/libs/knockout-3.3.0.js',
        './source/javascripts/libs/knockout.mapping-latest.js',
        './source/javascripts/libs/knockout.validation.js',
        './source/javascripts/libs/tablesorter.js',
        './source/javascripts/libs/jquery.mCustomScrollbar.min.js',
        './source/javascripts/libs/isotope.js',
        './source/javascripts/libs/placeholders.min.js',
        './source/javascripts/libs/attrchange.js',
        './source/javascripts/libs/moment.js',
        './source/javascripts/libs/accounting.js',
        './source/javascripts/libs/lodash.js',
        './source/javascripts/libs/backbone.js',
        './source/javascripts/libs/backbone.mixin.js',
        './source/javascripts/libs/backbone.puree.js',
        './source/javascripts/libs/backbone.stickit.js',
        './source/javascripts/libs/backbone.validation.js',
        './source/javascripts/libs/backbone.paginator.js',
        './source/javascripts/publics/**/*.js',
        './source/javascripts/util/**/*.js',
        './source/javascripts/validation/**/*.js',
        './source/javascripts/mixins/**/*.js',
        // Main app
        './source/javascripts/app.js',
        // Supporting Scripts
        './source/javascripts/error/**/*.js',
        './source/javascripts/global/**/*.js',
        './source/javascripts/site-branding/**/*.js',
        './source/javascripts/integrator/**/*.js',
        './source/javascripts/credit/**/*.js',
        './source/javascripts/dashboard/**/*.js',
        './source/javascripts/payment/**/*.js',
        './source/javascripts/credit-report/**/*.js',
        './source/javascripts/affiliate/**/*.js',
        './source/javascripts/user/**/*.js',
        './source/javascripts/enrollment/**/*.js',
        './source/javascripts/monitoring/**/*.js',
        './source/javascripts/general/**/*.js',
        './source/javascripts/alerts/**/*.js',
        './source/javascripts/profile/**/*.js',
        './source/javascripts/family/**/*.js',
        './source/javascripts/admin/**/*.js'
    ])
};

gulp.task('convert-to-jsps', function() {
    return gulp.src(['./build/**/*.html'])
        .pipe(ignore('googlebe0cad774c83461d.html'))
        .pipe(inject.prepend('<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>\n'))
        .pipe(inject.after('<!DOCTYPE html>', '\n<!-- ${pageContext.request.servletPath} -->\n'))
        .pipe(rename({
            extname: '.jsp'
        }))
        .pipe(gulp.dest(PATHS.deploy));
});

gulp.task('run-webpack', ['convert-to-jsps'], function() {
    return gulp.src(JS.app)
        //.pipe(webpack(require('./webpack.config.js')))  // commenting because i want to pass multi entry points

        //.pipe(webpack())
        .pipe(gulp.dest(PATHS.deploy));
});

// TODO: replace with webpack
gulp.task('build-css', ['run-webpack'], function() {
    return gulp.src('./source/stylesheets/*.scss')
        .pipe(compass({
            config_file: 'config.rb',
            css: PATHS.deploy + '/stylesheets',
            sass: './source/stylesheets'
        }))
        .pipe(gulp.dest(PATHS.deploy + '/stylesheets'));
});

// TODO: replace with webpack
gulp.task('build-js', ['build-css'], function() {
    return gulp.src(JS.app)
        .pipe(concat('public.js'))
        .pipe(gulp.dest(PATHS.deploy + '/javascripts'));
});

gulp.task('copy-static', ['build-css'], function() { //build-js, run-webpack
    return gulp.src(['./source/google*.html']).pipe(gulp.dest(PATHS.deploy))
        && gulp.src(['./source/**/*.png', './source/**/*.jpg', './source/**/*.gif', './source/**/*.ico']).pipe(gulp.dest(PATHS.deploy))
        && gulp.src(['./source/**/*.pdf']).pipe(gulp.dest(PATHS.deploy))
        && gulp.src(['./source/**/*.doc']).pipe(gulp.dest(PATHS.deploy))
        && gulp.src(['./node_modules/bootstrap-sass/assets/fonts/bootstrap/*.eot',
                     './node_modules/bootstrap-sass/assets/fonts/bootstrap/*.svg',
                     './node_modules/bootstrap-sass/assets/fonts/bootstrap/*.ttf',
                     './node_modules/bootstrap-sass/assets/fonts/bootstrap/*.woff',
                     './node_modules/bootstrap-sass/assets/fonts/bootstrap/*.woff2']).pipe(gulp.dest(PATHS.deploy + '/fonts/bootstrap'))
        && gulp.src(['./node_modules/font-awesome/fonts/*.eot',
                     './node_modules/font-awesome/fonts/*.svg',
                     './node_modules/font-awesome/fonts/*.ttf',
                     './node_modules/font-awesome/fonts/*.woff',
                     './node_modules/font-awesome/fonts/*.woff2']).pipe(gulp.dest(PATHS.deploy + '/fonts'))
        && gulp.src(['./source/**/*.eot',
                     './source/**/*.svg',
                     './source/**/*.ttf',
                     './source/**/*.woff']).pipe(gulp.dest(PATHS.deploy))
        && gulp.src(['./build/**/*.jsp']).pipe(gulp.dest(PATHS.deploy))// TODO: change jsp copy call once jsp's are the main html file.
        && gulp.src(['./source/javascripts/libs/amplify.js']).pipe(gulp.dest(PATHS.deploy + '/javascripts/libs'))
        && gulp.src(['./source/javascripts/libs/amcharts/*.js']).pipe(gulp.dest(PATHS.deploy + '/javascripts/libs/amcharts'))
        && gulp.src(['./source/javascripts/root.js']).pipe(gulp.dest(PATHS.deploy + '/javascripts'))
        && gulp.src(['./source/stylesheets/transunion/*.css']).pipe(gulp.dest(PATHS.deploy + '/stylesheets/transunion'));
});

gulp.task('clean-deploy', function(cb) {
    return del([PATHS.deploy], cb);
});

gulp.task('build', ['clean-deploy'], function(){
    gulp.start(['copy-static']);
});

gulp.task('clean-build', function() {
    return del([PATHS.build]);
});

// TODO: remove middleman call once jsp's are the main html file.
gulp.task('build-middleman', ['clean-build'], shell.task([
    'bundle install',
    'bundle exec middleman build'
]));

gulp.task('default', ['build']);
