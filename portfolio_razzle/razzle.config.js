const LoadableWebpackPlugin = require("@loadable/webpack-plugin");
const path = require("path");

module.exports = {
    modifyWebpackConfig(opts) {
        const config = opts.webpackConfig;

        // add loadable webpack plugin only
        // when we are building the client bundle
        if (opts.env.target === "web") {
            const filename = path.resolve(__dirname, "build");

            // saving stats file to build folder
            // without this, stats files will go into
            // build/public folder
            config.plugins.push(
                new LoadableWebpackPlugin({
                    outputAsset: false,
                    writeToDisk: { filename },
                })
            );

            //enable sourcemaps
            config.devtool = 'eval-cheap-module-source-map';
        }

        return config;
    },
    plugins: [
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
                },
                forkTsChecker: {
                    eslint: {
                        files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
                    }
                },
            },
        },
    ],
};
