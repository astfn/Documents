const _path = require("path");
const CracoLessPlugin = require("craco-less");

const resolve = (dirPath) => _path.resolve(__dirname, dirPath);
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#82ccdd" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      "@": resolve("./src"),
      components: resolve("./src/components"),
    },
  },
};
