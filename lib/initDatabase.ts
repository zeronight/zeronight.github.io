import { promises as fsp } from 'fs';
import fse from 'fs-extra';
import path from 'path';
import Database, { Article, ArticleBase } from 'types/database';

const buildArticlesApi = async (articles: Article[], basedir: string) => {
  const articleDir = path.resolve(basedir, 'article');

  await fsp.mkdir(articleDir, { recursive: true });

  const articlePreviews: ArticleBase[] = articles.map(article => ({
    tags: article.tags,
    date: article.date,
    title: article.title,
    route: article.route,
  }));

  const writeArticles = () => fse.writeJSON(path.resolve(basedir, 'articles'), articlePreviews);
  const writeArticle = (article: Article) => fse.writeJSON(
    path.resolve(articleDir, article.route),
    article,
  );

  return Promise.all([writeArticles(), ...articles.map(a => writeArticle(a))]);
};

export default function buildDatabase(database: Database, basedir: string) {
  return buildArticlesApi(database.articleList, basedir);
}
