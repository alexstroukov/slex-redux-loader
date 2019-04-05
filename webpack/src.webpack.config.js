const path = require('path')

const config = {
  entry: {
    slexReduxLoader: '../src/index'
  },
  devtool: 'source-map',
  context: __dirname,
  target: 'web',
  stats: {},
  devServer: {},
  plugins: [],
  profile: true,

  output: {
    path: path.resolve(__dirname, '../compiled'),
    filename: '[name].js',
    libraryTarget: 'umd',
    pathinfo: true,
    sourceMapFilename: '[file].map',
    devtoolModuleFilenameTemplate: 'webpack:///[resource-path]',
    devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]',
    umdNamedDefine: true,
    sourcePrefix: '\t'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, '../src')
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
    extensions: ['.js', '.json', '.css'],
    plugins: []
  }
}

module.exports = config
