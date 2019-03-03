import React, { lazy, ComponentType } from 'react';
import { match, matchPath, RouteProps, RouteComponentProps as RCP } from 'react-router-dom';
import { getArticle, getArticles } from './lib/article';

interface RouteConfig extends RouteProps {
  loadComponent: () => Promise<{ default: ComponentType<any> }>;
  loadData?: (routeParams: match<any>) => Promise<any>;
}

const importHome = () => import(/* webpackChunkName: "home" */'./containers/home');
const importArticle = () => import(/* webpackChunkName: "article" */'./containers/article');

const getArticleByRoute = (x: match<{article: string}>) => getArticle(x.params.article);

const routesConfig: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    loadComponent: importHome,
    loadData: getArticles,
  },
  {
    path: '/articles/:article',
    loadComponent: importArticle,
    loadData: getArticleByRoute,
  },
];

async function getRouteProps(path: string): Promise<RouteProps[]> {
  return Promise.all(routesConfig.map(async (route) => {
    const { loadComponent, loadData, ...routeProps } = route;
    const matchInfo = matchPath(path, routeProps);

    let component;
    if (matchInfo) {
      const { default: Container } = await loadComponent();
      let preLoadData: any;
      if (loadData) {
        preLoadData = await loadData(matchInfo);
      }
      component = (props: RCP) => <Container preLoadData={preLoadData} {...props} />;
    } else {
      component = lazy(route.loadComponent);
    }

    return { ...routeProps, component };
  }));
}

export default getRouteProps;
