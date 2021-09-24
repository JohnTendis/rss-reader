// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = [new ForkTsCheckerWebpackPlugin(), new NodePolyfillPlugin()];
