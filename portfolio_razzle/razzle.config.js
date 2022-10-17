const LoadableWebpackPlugin = require('@loadable/webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');
const zlib = require('zlib');

module.exports = {
  experimental: {
    // Toggles between `webpack-node-externals` and razzle custom implementation to resolve imports.
    // razzle implementation: https://github.com/jaredpalmer/razzle/blob/3b4e2ba732432ea393a406219ba36e33ec3f5463/packages/razzle/config/createConfigAsync.js#L260
    newExternals: false,
    // Uses `[contenthash]` instead of `[hash]` when generating asset chunk names.
    // webpack docs: https://webpack.js.org/guides/caching/#output-filenames
    // razzle config: https://github.com/jaredpalmer/razzle/blob/3b4e2ba732432ea393a406219ba36e33ec3f5463/packages/razzle/config/createConfigAsync.js#L565,L588
    newContentHash: true,
    // Enables configuring splitChunks in `modifyWebpackOptions`.
    newSplitChunks: true,
    // Uses webpack's `mainFields` config to define which bundle to use of external libs.
    // webpack docs: https://webpack.js.org/configuration/resolve/#resolvemainfields
    // razzle config: https://github.com/jaredpalmer/razzle/blob/3b4e2ba732432ea393a406219ba36e33ec3f5463/packages/razzle/config/createConfigAsync.js#L490
    newMainFields: true
  },
  modifyWebpackOptions ({
    env: { target, dev },
    options: { webpackOptions }
  }) {
    webpackOptions.splitChunksConfig = {
      ...webpackOptions.splitChunksConfig,
      maxAsyncRequests: 999,
      maxInitialRequests: 999,
      cacheGroups: {
        default: false,
        vendors: false,
        defaultVendors: false,

        // 1. external libs go to a separate chunk as they rarely changing
        vendor: {
          test: /\/node_modules\//,
          name: 'vendor',
          chunks: 'initial',
          priority: 3,
          enforce: true
        },

        // 2. if a module is used in multiple chunks then put it into a separate chunk
        common: {
          minChunks: 2,
          chunks: 'all',
          priority: 2,
          enforce: true
        }
      }
    };

    return webpackOptions;
  },
  options: {
    enableBabelCache: true
  },
  modifyWebpackConfig ({
    env: { target, dev },
    webpackConfig: config,
    webpackObject: webpack
  }) {
    const isDev = !!dev;
    const isServer = target === 'node';
    const isClient = !isServer;

    // saving stats file to build folder
    // without this, stats files will go into
    // build/public folder
    isClient && config.plugins.push(
      new LoadableWebpackPlugin({
        outputAsset: false,
        writeToDisk: {
          filename: path.resolve(__dirname, 'build')
        }
      })
    );

    config.plugins.push(new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11
        }
      },
      threshold: 10240,
      minRatio: 0.8
    })
    );

    // enable sourcemaps
    config.devtool = undefined;
    if (isClient && isDev) {
      config.devtool = 'eval-cheap-module-source-map';
    }

    if (isDev) {
      config.output.pathinfo = true;
      config.optimization = {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false
      };
    }

    // -- Disable AggressiveMergingPlugin from default Razzle config
    if (isClient) {
      config.plugins = config.plugins.filter(
        plugin => !(plugin instanceof webpack.optimize.AggressiveMergingPlugin)
      );
    }

    // -- Disable HMR
    // if (isClient && isDev) {
    //     config.plugins = config.plugins.filter(
    //         plugin => !(plugin instanceof webpack.HotModuleReplacementPlugin)
    //     );
    // }

    config.module.rules.push({
      test: /\.(woff2|woff|eot|ttf|otf)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'assets/fonts/',
        publicPath: 'assets/fonts/'
      }
    });

    return config;
  },
  plugins: [
    {
      name: 'purgecss',
      options: {
        // This path options is required for PurgeCSS to analyzed all of our content
        path: path.resolve(__dirname, 'src/**/*')
      }
    },
    'scss',
    'graphql',
    {
      name: 'typescript',
      options: {
        useBabel: false,
        tsLoader: {
          transpileOnly: true,
          experimentalWatchApi: true,
          happyPackMode: true
        }
        // forkTsChecker: {
        //     eslint: {
        //         files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
        //     }
        // },
      }
    }
  ]
};
