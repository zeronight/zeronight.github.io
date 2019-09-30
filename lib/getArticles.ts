import fs from 'fs';
import path from 'path';
import { Article } from 'types/database';

interface Meta {
  title: string;
  date: string;
  tags: string[];
}

function getArticle(dir: string): Article {
  const metaFilePath = path.resolve(dir, 'meta.json');
  const contentFilePath = path.resolve(dir, 'content.md');
  const meta = fs.readFileSync(metaFilePath, 'utf-8');
  const { title, date, tags } = JSON.parse(meta) as Meta;
  const content = fs.readFileSync(contentFilePath, 'utf-8');

  return {
    title,
    content,
    tags,
    date,
    route: path.basename(dir),
  };
}

function getArticles(markdownDir: string): Article[] {
  return (
    fs.readdirSync(markdownDir)
      .map((name) => path.resolve(markdownDir, name))
      .filter((dir) => fs.statSync(dir).isDirectory())
      .map(getArticle)
  );
}

export default getArticles;
