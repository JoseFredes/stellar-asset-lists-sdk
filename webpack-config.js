const {initLibWebpackConfig} = require('@stellar-expert/lib-webpack-template')

module.exports = initLibWebpackConfig({
    libName: 'stellarAssetListsSdk',
    inputPath: './index.js',
    outputPath: './lib'
})