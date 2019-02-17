import React, { useState, useEffect } from 'react';
import { RouteComponentProps, match } from 'react-router-dom';
import { Article as ArticleModel } from 'types/database';
import Article from '../components/article';
import fetchJson from '../lib/fetchJson';
interface RouteParams {
  article: string;
}

let preLoadArticle: ArticleModel | null = null;

const fetchArticle = (name: string) => fetchJson(`/api/article/${name}`) as Promise<ArticleModel>;

export const preLoadData = async (x: match<RouteParams>) => {
  preLoadArticle = await fetchArticle(x.params.article);
};

function ArticleContainer(props: RouteComponentProps<RouteParams>) {
  const { match: { params: { article: articleRoute } } } = props;
  const hasPreLoad = preLoadArticle && preLoadArticle.route === articleRoute;

  const [article, setArticle] = useState(hasPreLoad ? preLoadArticle : null);

  useEffect(() => {
    if (article && article.route === articleRoute) {
      return;
    }

    fetchArticle(articleRoute).then((content) => {
      if (content.route === articleRoute) {
        setArticle(content);
      }
    });
  }, [articleRoute]);

  return article ? <Article article={article}/> : null;
}

export default ArticleContainer;
