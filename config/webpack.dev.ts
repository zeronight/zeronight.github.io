import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.base';

const config: webpack.Configuration = merge(baseConfig, {
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
  },
});

export default config;
