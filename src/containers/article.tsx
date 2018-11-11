import React, { PureComponent } from 'react';
import { RouteComponentProps, match } from 'react-router-dom';
import { Article as ArticleModel } from 'types/database';
import Article from '../components/article';
import fetchJson from '../lib/fetchJson';
interface RouteParams {
  article: string;
}

interface State {
  article: ArticleModel | null;
}

let preLoadArticle: ArticleModel | null = null;

const fetchArticle = (name: string) => fetchJson(`/api/article/${name}`) as Promise<ArticleModel>;

export const preLoadData = async (x: match<RouteParams>) => {
  preLoadArticle = await fetchArticle(x.params.article);
};

class ArticleContainer extends PureComponent<RouteComponentProps<RouteParams>, State> {
  constructor(props: RouteComponentProps<RouteParams>) {
    super(props);

    const { match: { params: { article } } } = props;

    const hasPreLoad = preLoadArticle && preLoadArticle.route === article;

    this.state = {
      article: hasPreLoad ? preLoadArticle : null,
    };
  }

  public componentDidMount() {
    if (this.state.article === null) {
      this.fetchArticle();
    }
  }

  public componentDidUpdate(preProps: RouteComponentProps<RouteParams>) {
    const { article } = this.props.match.params;

    if (article !== preProps.match.params.article) {
      this.fetchArticle();
    }
  }

  public render() {
    const { article } = this.state;

    if (!article) {
      return null;
    }

    return <Article article={article}/>;
  }

  private async fetchArticle() {
    const { match: { params: { article: name } } } = this.props;

    const article = await fetchArticle(name);

    this.setState({ article });
  }
}

export default ArticleContainer;
