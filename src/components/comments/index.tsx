import React, { PureComponent } from 'react';
import Gitalk from 'gitalk';
import { Article } from 'types/database';
import gitalkBaseConfig from '../../constants/gitalk.config';

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
      ...gitalkBaseConfig,
      id: article.route,
      title: article.route,
    });

    gitalk.render(this.container.current);
  }
}

export default Comments;
