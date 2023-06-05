
/** 
 * @summary This demonstrates deriving 'name' from a module in a matching chunk group, 
 * replacing some chars in the module name, and then returning a unique string to create 
 * a new name, and ideally a new chunk.
 * 
 * @type {import('@rspack/cli').Configuration} 
 * */
const config = {
    entry: {
        main: "./src/index.jsx"
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg)$/,
                type: "asset/resource"
            }
        ]
    },
    builtins: {
        html: [
            {
                template: "./index.html"
            }
        ]
    },
    optimization: {
        sideEffects: true,
        minimize: true,
        splitChunks: {
            chunks: 'all',
            minChunks: 1,
            minSize: 20000,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    reuseExistingChunk: true,
                    name(module) {
                        if ('name' in module && typeof module.name === 'string') {
                            console.log('NAME', module.name)
                            if (/[\\/].pnpm[\\/](.*?)([\\/]|$)/.test(module.name)) {
                                // get the name. E.g. node_modules/packageName/not/this/part.js
                                // or node_modules/packageName
                                const packageName = module.name.match(
                                    /[\\/].pnpm[\\/](.*?)([\\/]|$)/
                                )[1];

                                const path = `module.${packageName.replaceAll('@', '')}`;

                                // npm package names are URL-safe, but some servers don't like @ symbols
                                return path.replaceAll('+', '_');
                            }
                            return module.name
                        }
                        return ''
                    },
                },
            },
        },
    }
};

module.exports = config;
