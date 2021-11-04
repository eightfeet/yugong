const path = require('path');

const lessVariables = require('./config.themeVariable');

const { override, setWebpackOptimizationSplitChunks, fixBabelImports, addLessLoader, setWebpackPublicPath, addWebpackAlias } = require('customize-cra');

const multipleEntry = require('react-app-rewire-multiple-entry')([
  {
    entry: 'src/dashboard/index.tsx',
    outPath: '/dashboard/index.html'
  },
  {
    entry: 'src/index.tsx',
    outPath: '/index.html'
  }
]);

const config = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, // change importing css to less
    }),
    addLessLoader({
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: lessVariables,
        },
        additionalData: "@import 'node_modules/antd/lib/style/themes/default.less';"
    }),
    setWebpackPublicPath(process.env.REACT_APP_PUBLIC_PATH),
    addWebpackAlias({
      "~": path.resolve(__dirname, "./src"),
    }),
    setWebpackOptimizationSplitChunks({
      "chunks": "all",
      "name": false,
      "maxSize": 307200,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          // cacheGroupKey here is `commons` as the key of the cacheGroup
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight((item) => item);
            const allChunksNames = chunks.map((item) => item.name).join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
          chunks: 'all',
        },
      },
    }),
    multipleEntry.addMultiEntry
);

module.exports = config;