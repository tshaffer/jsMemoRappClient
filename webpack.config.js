var CopyWebpackPlugin =  require('copy-webpack-plugin');

module.exports = {
  mode: "development",

  entry: "./src/index.tsx",

  output: {
    publicPath: './build/',
    filename: "bundle.js",
    path: __dirname + "/build"
  },

  devtool: "source-map",

  target: 'web',

  plugins: [
    new CopyWebpackPlugin([
        {from:'./build/bundle.js', to:'../../jsMemoRappServer/public/build'},
        {from:'./build/bundle.js.map', to:'../../jsMemoRappServer/public/build'},
    ]),
  ],

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  }
};
