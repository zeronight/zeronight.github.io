export interface ArticleBase {
  readonly title: string;
  readonly tags: string[];
  readonly date: string;
  readonly route: string;
}
export interface Article extends ArticleBase {
  readonly content: string;
}

export default interface Database {
  readonly articleList: Article[];
}
