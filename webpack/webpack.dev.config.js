var path = require("path");
var webpack = require("webpack");
var assetsPath = path.join(__dirname, '..', 'public', 'assets');
var hotMiddlewareScript = 'webpack-hot-middleware/client';

module.exports = {
    // The configuration for the client
    name: "browser",
    // A SourceMap is emitted.
    devtool: "eval",
    context: path.join(__dirname, "..", "app"),
    entry: {
      app: ["./server", hotMiddlewareScript ]
    },
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "[name].js",
      // The output path from the view of the Javascript
      publicPath: '/assets/',
      // libraryTarget: "commonjs2"
    },
    module: {
      loaders: [{
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react', 'es2015']
        }
      }]
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.scss'],
      modulesDirectories: [
        "app", "node_modules"
      ]
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          __TEST__: JSON.stringify(JSON.parse(process.env.TEST_ENV || 'false'))
        })
    ]

};
