import React, { useState, useEffect } from 'react';
import { ArticleBase } from 'types/database';
import ArticleList from '../components/article-list';
import fetchJson from '../lib/fetchJson';

let defaultArticles: ArticleBase[] = [];

const fetchArticles = () => fetchJson('/api/articles') as Promise<ArticleBase[]>;

export const preLoadData = async () => {
  defaultArticles = await fetchArticles();
};

function Home() {
  const [articles, setArticles] = useState(defaultArticles || []);

  useEffect(() => {
    if (articles) {
      return;
    }
    fetchArticles().then(res => setArticles(res))
  }, []);

  return <ArticleList articles={articles}/>;
}

export default Home;
