const path = require('path');

const lessVariables = require('./config.themeVariable');

const {
    override,
    setWebpackOptimizationSplitChunks,
    fixBabelImports,
    addLessLoader,
    setWebpackPublicPath,
    addWebpackAlias,
} = require('customize-cra');

const multipleEntry = require('react-app-rewire-multiple-entry')([
    {
        entry: 'src/dashboard/index.tsx',
        outPath: '/dashboard/yugong.html',
    },
    {
        entry: 'src/index.tsx',
        outPath: '/index.html',
    },
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
        additionalData:
            "@import 'node_modules/antd/lib/style/themes/default.less';",
    }),
    setWebpackPublicPath(process.env.REACT_APP_PUBLIC_PATH),
    addWebpackAlias({
        '~': path.resolve(__dirname, './src'),
    }),
    setWebpackOptimizationSplitChunks({
        minSize: 30,
        name: false,
        cacheGroups: {
            default: {
                name: 'common',
                chunks: 'initial',
                minChunks: 2, //模块被引用2次以上的才抽离
                priority: -20,
            },
            vendors: {
                //拆分第三方库（通过npm|yarn安装的库）
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'initial',
                maxSize: 300000,
                priority: -10,
            }
        },
    }),
    multipleEntry.addMultiEntry
);

module.exports = config;
