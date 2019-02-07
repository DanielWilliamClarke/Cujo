// Karma configuration
// Generated on Sat Jun 16 2018 00:22:01 GMT+0100 (GMT Summer Time)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    client: {
      clearContext: false
    },
    
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'test/**/*.spec.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.spec.js': ['webpack', 'sourcemap']
    },

    coverageReporter: {
      reporters: [{
          type: 'text'
        },
        {
          type: 'html',
          subdir: 'html'
        }
      ],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: config.coverage ? ['mocha', 'coverage'] : ['mocha'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    webpack: {
      cache: true,
      mode: "development",
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            enforce: 'pre',
            test: /.spec\.js$/,
            include: /tests/,
            exclude: /node_modules/,
            use: [{ loader: 'babel-loader' }]
          },
          {
            enforce: 'pre',
            test: /\.js$/,
            include: /src/,
            exclude: /node_modules/,
            use: [{ loader: 'istanbul-instrumenter-loader', query: { esModules: true } }]
          },

          {
            test: /\.js$/,
            include: /src/,
            exclude: /node_modules|tests/,
            use: [{ loader: 'babel-loader' }]
          },
        ],
      },
    }
  })
}