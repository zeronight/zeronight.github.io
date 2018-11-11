import Database from 'types/database';
import getArticles from '../lib/getArticles';
import initDataBase from '../lib/initDatabase';
import { articlesDir, apiDir } from '../config/webpack.base';

const database: Database = {
  articleList: getArticles(articlesDir),
};

initDataBase(database, apiDir);
