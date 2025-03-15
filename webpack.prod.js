const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.m?js$/,  // Tambahkan dukungan untuk .mjs (ES Module)
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true, // Tambahkan cache agar build lebih cepat
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.mjs'], // Tambahkan ekstensi .mjs jika perlu
  },
});
