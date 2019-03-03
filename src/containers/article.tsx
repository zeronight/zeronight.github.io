import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Article as ArticleModel } from 'types/database';
import Article from '../components/article';
import { getArticle } from '../lib/article';

export interface RouteParams {
  article: string;
}

interface Props extends RouteComponentProps<RouteParams> {
  preLoadData?: ArticleModel;
}

function ArticleContainer(props: Props) {
  const { match, preLoadData } = props;
  const { params: { article: articleRoute } } = match;

  const [article, setArticle] = useState(
    preLoadData && preLoadData.route === articleRoute ? preLoadData : null,
  );

  useEffect(() => {
    if (article && article.route === articleRoute) {
      return;
    }

    getArticle(articleRoute).then((content) => {
      if (content.route === articleRoute) {
        setArticle(content);
      }
    });
  }, [articleRoute]);

  return article ? <Article article={article}/> : null;
}

export default ArticleContainer;
