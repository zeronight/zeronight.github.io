import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsWebpackPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import PrerenderSPAPlugin from 'prerender-spa-plugin';
import { ArticleBase } from 'types/database';
import { moveScriptTagToBody, setScriptAttributes } from '../lib/htmlHelper';
import baseConfig, { apiDir, projectDir, distDir } from './webpack.base';

const { PuppeteerRenderer } = PrerenderSPAPlugin;

const getArticleRoutes = () => {
  const articlesText = fs.readFileSync(`${apiDir}/articles`, 'utf-8');

  return JSON.parse(articlesText).map(
    (article: ArticleBase) => `/articles/${article.route}`,
  );
};

const config: webpack.Configuration = merge(baseConfig, {
  mode: 'production',

  output: {
    publicPath: '/dist/',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new PrerenderSPAPlugin({
      staticDir: projectDir,
      indexPath: path.resolve(distDir, 'index.html'),
      routes: ['/', ...getArticleRoutes()],
      renderer: new PuppeteerRenderer({
        renderAfterDocumentEvent: 'app-ready',
      }),
      postProcess(route: { html: string }) {
        /* eslint-disable no-param-reassign */
        route.html = moveScriptTagToBody(route.html);
        route.html = setScriptAttributes(route.html, { defer: true, async: true });
        /* eslint-enable no-param-reassign */
        return route;
      },
    }),
  ],

  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new UglifyJsWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
    ],
  },
});

export default config;
