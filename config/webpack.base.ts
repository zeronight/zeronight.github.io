import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Database from 'types/database';
import getArticles from './util/getArticles';

export const projectDir = path.resolve(__dirname, '..');
export const articlesDir = path.resolve(projectDir, 'markdown');
export const sourceDir = path.resolve(projectDir, 'src');
export const distDir = path.resolve(projectDir, 'dist');

export const database: Database = {
  articleList: getArticles(articlesDir),
};

const config: webpack.Configuration = {
  devtool: false,

  context: sourceDir,

  entry: {
    app: './index.tsx',
  },

  output: {
    path: distDir,
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'src/tsconfig.json',
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '*'],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.database': JSON.stringify(database),
    }),
    new HtmlWebpackPlugin({
      template: 'template.html',
    }),
  ],
};

export default config;
