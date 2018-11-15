
import React, { StatelessComponent, Fragment, Suspense, lazy } from 'react';
import Markdown from 'react-markdown';
import { format } from 'date-fns';
import { Article } from 'types/database';
import CodeBlock from '../code-block';

import './style.css';
import 'github-markdown-css';

const Comments = lazy(() => import(/* webpackChunkName: "comment" */'../comments'));

interface ArticleProps {
  article: Article;
}

const ArticleList: StatelessComponent<ArticleProps> = ({ article }) => {
  return (
    <Fragment>
      <article className="article">
        <h1 className="article_title">{article.title}</h1>
        <div className="article_meta">
          <span className="article_date">{format(article.date, 'YYYY-MM-DD')}</span>
          <span className="article_tags">{article.tags.join(',')}</span>
        </div>
        <Markdown
          className="markdown-body"
          source={article.content}
          renderers={{ code: CodeBlock }}
        />
      </article>
      <Suspense fallback={<div/>}>
        <Comments article={article} />
      </Suspense>
    </Fragment>
  );
};

export default ArticleList;
