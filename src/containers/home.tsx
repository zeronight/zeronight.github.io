import React, { StatelessComponent } from 'react';
import DataBase from 'types/database';
import ArticleList from '../components/article-list';

const data = process.env.database as DataBase;

const Home: StatelessComponent<{}> = () => {
  return <ArticleList articles={data.articleList}/>;
};

export default Home;
