import React, { useState, useEffect } from 'react';
import { ArticleBase } from 'types/database';
import ArticleList from '../components/article-list';
import { getArticles } from '../lib/article';

interface Props {
  preLoadData?: ArticleBase[];
}

function Home({ preLoadData }: Props) {
  const [articles = [], setArticles] = useState(preLoadData);

  useEffect(() => {
    if (preLoadData) {
      return;
    }
    getArticles().then(res => setArticles(res));
  }, []);

  return <ArticleList articles={articles}/>;
}

export default Home;
