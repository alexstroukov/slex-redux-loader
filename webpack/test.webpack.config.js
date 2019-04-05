const path = require('path')
const nodeExternals = require('webpack-node-externals')

const config = {
  entry: {
    test: '../test/index'
  },
  devtool: 'source-map',
  context: __dirname,
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, '../compiled'),
    filename: '[name].js',
    libraryTarget: 'umd',
    pathinfo: true,
    sourceMapFilename: '[file].map',
    devtoolModuleFilenameTemplate: function (info) {
      return 'file:///' + info.absoluteResourcePath
    },
    devtoolFallbackModuleFilenameTemplate: function (info) {
      return 'file:///' + info.absoluteResourcePath + '?[hash]'
    },
    umdNamedDefine: true,
    sourcePrefix: '\t'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../test')
        ],
        loader: 'babel-loader',
        options: {
          presets: ['es2015'],
          plugins: [
            'transform-object-rest-spread',
            'transform-es2015-destructuring',
            'transform-class-properties'
          ]
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        options: {}
      }
    ]
  },

  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)
    modules: [
      'node_modules'
    ],
    extensions: ['.js', '.json'],
    plugins: []
  }
}

module.exports = config
