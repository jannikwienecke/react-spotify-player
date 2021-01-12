var TypedocWebpackPlugin = require("typedoc-webpack-plugin");


module.exports{
  // add to webpack plugins
  plugins: [
    new TypedocWebpackPlugin({
      theme: "./typedoc-theme/",
    }),
  ];
}