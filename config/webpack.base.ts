import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export const projectDir = path.resolve(__dirname, '..');
export const articlesDir = path.resolve(projectDir, 'markdown');
export const apiDir = path.resolve(projectDir, 'api');
export const sourceDir = path.resolve(projectDir, 'src');
export const distDir = path.resolve(projectDir, 'dist');

const config: webpack.Configuration = {
  devtool: false,

  context: sourceDir,

  entry: {
    app: './index.tsx',
  },

  output: {
    path: distDir,
    publicPath: '/',
    filename: 'js/[name].js',
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '*'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'template.html',
    }),
  ],

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
};

export default config;
