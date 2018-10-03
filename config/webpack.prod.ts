import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
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

  plugins: [
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
});

export default config;
