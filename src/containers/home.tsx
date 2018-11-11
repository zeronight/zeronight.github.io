import React, { PureComponent } from 'react';
import { ArticleBase } from 'types/database';
import ArticleList from '../components/article-list';
import fetchJson from '../lib/fetchJson';

let defaultArticles: ArticleBase[];

const fetchArticles = () => fetchJson('/api/articles') as Promise<ArticleBase[]>;

export const preLoadData = async () => {
  defaultArticles = await fetchArticles();
};

interface State {
  articles: ArticleBase[];
}

class Home extends PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      articles: defaultArticles || [],
    };
  }

  public componentDidMount() {
    if (!defaultArticles) {
      this.fetchArticles();
    }
  }

  public render() {
    const { articles } = this.state;

    return <ArticleList articles={articles}/>;
  }

  private async fetchArticles() {
    const articles = await fetchArticles();

    this.setState({ articles });
  }
}

export default Home;
