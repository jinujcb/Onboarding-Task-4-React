module.exports = {
    context: __dirname,
    mode: 'development',
    entry: {
        app: "./app.jsx",
        customers: "./CustomersIndex.jsx",
        products: "./ProductsIndex.jsx",
        stores: "./StoresIndex.jsx",
        sales: "./SalesIndex.jsx",
    }
    ,
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    }
    ,
    watch: true,
    resolve: {
        extensions: [".jsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_models)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2017', 'react', 'stage-2']
                    }
                }
            }

        ]
    }
}
