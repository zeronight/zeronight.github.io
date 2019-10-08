import React, { StatelessComponent } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArticleBase } from 'types/database';

import './style.css';

interface ArticleListProps {
  articles: ArticleBase[];
}

const ArticleList: StatelessComponent<ArticleListProps> = ({ articles }) => {
  const articleList = articles.map(({ title, tags, date, route }) => (
    <Link key={title} to={`/articles/${route}`} className="articleList_item">
      <h2 className="articleList_title">{title}</h2>
      <div className="articleList_meta">
        <span className="articleList_tags">{tags.join(',')}</span>
        <span className="articleList_date">{format(new Date(date), 'yyyy-MM-dd')}</span>
      </div>
    </Link>
  ));

  return <section className="articleList">{articleList}</section>;
};

export default ArticleList;
