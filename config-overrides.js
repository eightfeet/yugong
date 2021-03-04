const path = require('path');

const lessVariables = require('./config.themeVariable');

const { override, fixBabelImports, addLessLoader, setWebpackPublicPath, addWebpackAlias } = require('customize-cra');

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
    multipleEntry.addMultiEntry
);

module.exports = config;