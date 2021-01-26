const path = require("path")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: "./src/index",
  cache: false,

  mode: "development",
  devtool: "eval-cheap-module-source-map",

  optimization: {
    minimize: false
  },

  output: {
    publicPath: "http://localhost:7002/",
    pathinfo: true,
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"]
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
              configFile: path.resolve(__dirname, './tsconfig.json'),
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

  plugins: [
    new ModuleFederationPlugin({
      name: "libs",
      library: { type: "var", name: "libs" },
      filename: "remoteEntry.js",
      exposes: {
        './antd': "./src/antd.js",
      },
    }),
  ]
};
