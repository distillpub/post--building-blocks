var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    "index": "./src/index.js",
  },
  resolve: {
    extensions: [ ".js", ".html", ".npy", ".json" ]
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].bundle.js",
    chunkFilename: "[name].[id].js"
  },
  module: {
    rules: [
      {
        test: /\.(html|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["es2015"],
          plugins: [
            require("babel-plugin-transform-object-rest-spread")
          ]
        }
      },
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: [
          // {loader: "svelte-hot-loader"},
          {
            loader: "svelte-loader",
            query: {
              dev: false,
              emitCSS: false,
              store: true
            }
          }

        ]
      },
      {
        test: /\.(npy|npc)$/,
        exclude: /node_modules/,
        loader: 'numpy-loader',
        options: {
          outputPath: 'data/'
        }
      },
      {
        test: /\.(json)$/,
        exclude: /node_modules/,
        loader: 'json-loader',
        options: {
          outputPath: 'data/'
        }
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        exclude: /node_modules/,
        loader: 'file',
        options: {
          outputPath: 'images/'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.ejs", 
      filename: "index.html", 
      chunks: ["index"]
    }),
    new CopyWebpackPlugin([ { from: 'static/' } ])
  ],
  devServer: {
    historyApiFallback: true,
    overlay: true,
    stats: "minimal",
    contentBase:  __dirname + "/public"
  },
  devtool: "inline-source-map"
};
