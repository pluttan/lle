const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/lle.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lle.js',
    library: 'lle',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.d.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
          {
            loader: 'string-replace-loader',
            options: {
              multiple: [
                { search: '@llec', replace: './controller', flags: 'g' },
                { search: '@llev', replace: './view', flags: 'g' },
                { search: '@lle', replace: '..', flags: 'g' },
              ]
            }
          }
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
