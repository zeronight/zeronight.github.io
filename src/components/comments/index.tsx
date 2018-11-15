import React, { PureComponent } from 'react';
import Gitalk from 'gitalk';
import { Article } from 'types/database';

import 'gitalk/dist/gitalk.css';

interface Props {
  article: Article;
}

class Comments extends PureComponent<Props> {
  private container = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    this.renderComments();
  }

  public componentDidUpdate(preProps: Props) {
    if (preProps.article.route !== this.props.article.route) {
      this.renderComments();
    }
  }

  public render() {
    return (
      <div ref={this.container} />
    );
  }

  private renderComments() {
    const { article } = this.props;
    const gitalk = new Gitalk({
      clientID: 'fc609eafebad9c228174',
      clientSecret: '1c851fc9ae1c7ee50c22a32cae9857daeb1cff59',
      repo: 'zeronight.github.io',
      owner: 'zeronight',
      admin: ['zeronight'],
      id: article.route,
      title: article.route,
    });

    gitalk.render(this.container.current);
  }
}

export default Comments;
