import React, { StatelessComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import DataBase from 'types/database';
import Article from '../components/article';

const data = process.env.database as DataBase;

interface RouteParams {
  article: string;
}

const ArticleContainer: StatelessComponent<RouteComponentProps<RouteParams>> = ({ match }) => {
  const { article: name } = match.params;

  const article = data.articleList.find((a) => a.route === name);

  if (!article) {
    return null;
  }

  return <Article article={article}/>;
};

export default ArticleContainer;
