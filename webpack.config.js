/**
 * This is the general optimization config I use for code splitting vendor
 * chunks when running pnpm. It splits each node_module into its own chunk.
 */
module.exports = {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimize: true,
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(
                            /[\\/].pnpm[\\/](.*?)([\\/]|$)/
                        )[1];

                        const path = `module.${packageName.replaceAll('@', '')}`;

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return path.replaceAll('+', '_');
                    },
                },
            },
        },
    },
    target: 'web',
    module: {
        // ...
    },
}

