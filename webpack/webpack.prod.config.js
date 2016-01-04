var path = require("path");
var webpack = require("webpack");

var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

module.exports = [
  {
    // The configuration for the client
    name: "browser",
    // A SourceMap is emitted.
    devtool: "source-map",
    context: path.join(__dirname, "..", "app"),
    entry: {
      app: "./server"
    },
    output: {
      // The output directory as absolute path
      path: path.join(__dirname, "..", "public", "assets"),
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "[name].js",
      // The output path from the view of the Javascript
      // publicPath: path.join(__dirname, '..', 'public'),
      libraryTarget: "commonjs2"
    },

    module: {
      loaders: [{
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react', 'es2015']
        }
      }],
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.scss'],
      modulesDirectories: [
        "app", "node_modules"
      ]
    }


  }
];
