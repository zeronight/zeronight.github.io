import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import getArticles from '../getArticles';

let articlesDir: string;

const articles = [
  {
    title: 'title1',
    date: '2018-09-24',
    tags: ['tags1-1', 'tags1-2'],
    route: 'article1',
    content: `
      # article1
      this is content of article1
    `,
  },
  {
    title: 'title2',
    date: '2018-09-25',
    tags: ['tags2-1', 'tags2-2'],
    route: 'article2',
    content: `
      # article2
      this is content of article2
    `,
  },
];

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

it('should works', async () => {
  expect.assertions(3);

  const articlesData = await getArticles(articlesDir);
  expect(articlesData).toHaveLength(2);
  expect(articlesData[0]).toEqual({
    ...articles[0],
    date: new Date(articles[0].date),
  });
  expect(articlesData[1]).toEqual({
    ...articles[1],
    date: new Date(articles[1].date),
  });
});
