import fs from 'fs';
import path from 'path';
import Database, { Article, ArticleBase } from 'types/database';
import writeJsonToFile from './writeJsonToFile';

const fsp = fs.promises;

const buildArticlesApi = async (articles: Article[], basedir: string) => {
  const articleDir = path.resolve(basedir, 'article');

  await fsp.mkdir(articleDir, { recursive: true });

  const articlePreviews: ArticleBase[] = articles.map((article) => ({
    tags: article.tags,
    date: article.date,
    title: article.title,
    route: article.route,
  }));

  const writeArticles = () => writeJsonToFile(articlePreviews, path.resolve(basedir, 'articles'));
  const writeArticle = (article: Article) => writeJsonToFile(article, path.resolve(articleDir, article.route));

  return Promise.all([writeArticles(), ...articles.map((a) => writeArticle(a))]);
};

export default function buildDatabase(database: Database, basedir: string) {
  return buildArticlesApi(database.articleList, basedir);
}
