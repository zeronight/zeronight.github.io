import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import getArticles from '../getArticles';
import articles from './helper/articles';

let articlesDir: string;

beforeAll(async () => {
  articlesDir = await fs.mkdtemp(path.resolve(os.tmpdir(), 'articles'));

  await Promise.all(articles.map(async (article) => {
    const { content, route, ...meta } = article;
    const articleDir = path.resolve(articlesDir, route);

    await fs.mkdir(articleDir);
    await fs.writeJSON(path.join(articleDir, 'meta.json'), meta);
    await fs.writeFile(path.join(articleDir, 'content.md'), content, 'utf-8');
  }));
});

afterAll(() => fs.remove(articlesDir));

describe('get articles from disk', () => {
  it('should works', async () => {
    const articlesData = await getArticles(articlesDir);
    expect(articlesData).toHaveLength(2);
    expect(articlesData[0]).toEqual(articles[0]);
    expect(articlesData[1]).toEqual(articles[1]);
  });
});
