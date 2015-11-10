module.exports = function(config) {
  config.set({

    basePath: '../',

    frameworks: ['browserify','jasmine'],

    files: [
      'www/lib/ionic/js/ionic.bundle.js',
      'www/lib/ngCordova/dist/ng-cordova.js',
      'www/lib/angular-animate/angular-animate.js',
      'www/lib/angular-mocks/angular-mocks.js',
      'www/js/*.js',
      'www/js/**/*.js',
      'test/unit-tests/*.js',
      'https://cdn.firebase.com/js/client/2.2.4/firebase.js',
      'https://cdn.firebase.com/libs/angularfire/1.1.3/angularfire.min.js'
    ],

    exclude: [
    ],

    browserify: {
        watch: true,
        debug: true
    },

    preprocessors: {
        'test/unit-tests/*': ['browserify']
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: false

  })
}
