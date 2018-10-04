import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import PrerenderSPAPlugin from 'prerender-spa-plugin';
import baseConfig, { database, projectDir, distDir } from './webpack.base';
import removeScriptTag from './util/removeScript';

const articleRoutes = database.articleList.map(
  (article) => `/articles/${article.route}`,
);

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
    new MiniCssExtractPlugin(),
    new PrerenderSPAPlugin({
      staticDir: projectDir,
      indexPath: path.resolve(distDir, 'index.html'),
      routes: ['/', ...articleRoutes],
      postProcess(route: { html: string }) {
        route.html = removeScriptTag(route.html);
        return route;
      },
    }),
  ],

  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin()],
  },
});

export default config;
