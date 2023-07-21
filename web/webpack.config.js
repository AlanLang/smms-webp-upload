/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production"; // 或者 env.production
  return {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? false : "inline-source-map",
    entry: {
      index: "./src/index.tsx",
      config: "./src/config.tsx",
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      compress: true,
      port: 9000,
      hot: true,
      open: true,
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: {
            loader: "swc-loader",
            options: {
              sync: true,
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            !isProduction && require.resolve("style-loader"),
            isProduction && MiniCssExtractPlugin.loader,
            require.resolve("css-loader"),
            {
              loader: require.resolve("postcss-loader"),
              options: {
                postcssOptions: {
                  ident: "postcss",
                  sourceMap: isProduction,
                },
              },
            },
          ].filter(Boolean),
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(__dirname, "public/index.html"),
        chunks: ["index"],
      }),
      new HtmlWebpackPlugin({
        filename: "config.html",
        template: path.join(__dirname, "public/index.html"),
        chunks: ["config"],
      }),
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:8].css",
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
      }),
    ],
  };
};
