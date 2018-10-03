import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.base';

const config: webpack.Configuration = merge(baseConfig, {
  mode: 'development',

  devServer: {
    historyApiFallback: true,
  },
});

export default config;
