const {override, fixBabelImports, addLessLoader, disableEsLint} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
    disableEsLint(),
    addLessLoader()
);
