import { Article, ArticleBase } from 'types/database';
import fetchJson from './fetchJson';

export const getArticle = (name: string) => fetchJson(`/api/article/${name}`) as Promise<Article>;

export const getArticles = () => fetchJson('/api/articles') as Promise<ArticleBase[]>;
