import os from 'os';
import path from 'path';
import fs from 'fs-extra';
import Database from 'types/database';
import initDatabase from '../initDatabase';
import articles from './helper/articles';

const database: Database = {
  articleList: articles,
};

let databaseDir: string;

beforeAll(async () => {
  databaseDir = await fs.mkdtemp(path.resolve(os.tmpdir(), 'database'));
  await initDatabase(database, databaseDir);
});

afterAll(() => fs.remove(databaseDir));

describe('init database', () => {
  test('get articles should works', async () => {
    const articlesFromFile = await fs.readJSON(path.resolve(databaseDir, 'articles'));
    const articlePreviews = articles.map(({ content: _, ...articleBase }) => articleBase);

    expect(articlesFromFile).toEqual(articlePreviews);
  });

  test('get article should works', async () => {
    const articleDir = path.resolve(databaseDir, 'article');
    const article0 = await fs.readJSON(path.resolve(articleDir, articles[0].route));
    const article1 = await fs.readJSON(path.resolve(articleDir, articles[1].route));

    expect(article0).toEqual(articles[0]);
    expect(article1).toEqual(articles[1]);
  });
});
