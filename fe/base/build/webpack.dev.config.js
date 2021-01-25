const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  cache: false,
  devtool: "eval-cheap-module-source-map",
  optimization: {
    minimize: false,
  },
  target: "web",
  entry: path.resolve(__dirname, "../src/main.ts"),
  output: {
    path: path.resolve(__dirname, '../view/development'),
    publicPath: 'http://localhost:7000/',
    filename: 'js/[name].js',
  },
  resolve: {
    extensions: [".vue", ".jsx", ".js", ".json"],
    alias: {
      vue: "@vue/runtime-dom",
      src: path.resolve(__dirname, "../src/")
    },
  },
  module: {
    rules: [
      // babel使用runtime，避免将不需要的代码注入
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            // cacheDirectory: true,
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-runtime',
              ['import', {
                "libraryName": "antd",
                "style": true,   // or 'css'
              }, 'antd']
            ]
          }
        }],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // 指定特定的ts编译配置，为了区分脚本的ts配置
              configFile: path.resolve(__dirname, '../tsconfig.json'),
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.png$/,
        use: {
          loader: "url-loader",
          options: { limit: 8192 },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: true },
          },
          "css-loader",
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#4608e2',
                  'link-color': '#4608e2',
                  'border-radius-base': '20px',
                },
                javascriptEnabled: true,
              }
            }
          }],
      }
    ],
  },
  watchOptions: {
    ignored: /node_modules/
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new ModuleFederationPlugin({
      name: "base",
      filename: "remoteEntry.js",
      remotes: {
        libs: "libs@http://localhost:7002/remoteEntry.js",
      },
      exposes: {
        
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 7000,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  resolve: {
    extensions: ['.js', '.ts']
  }
}
