import { Article } from 'types/database';

const articles: Article[] = [
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

export default articles;
