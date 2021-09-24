module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./electron/main",
  // Put your normal webpack config below here
  module: {
    rules: require("./webpack.rules"),
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    fallback: {
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      timers: require.resolve("timers-browserify"),
    },
  },
  plugins: require("./webpack.plugins"),
};
