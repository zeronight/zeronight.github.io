import React, { lazy, Suspense, ComponentType, ReactElement } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  match,
  matchPath,
  RouteProps,
} from 'react-router-dom';

const importHome = () => import(/* webpackChunkName: "home" */'./containers/home');
const importArticle = () => import(/* webpackChunkName: "article" */'./containers/article');

interface Page {
  default: ComponentType<any>;
  preLoadData?: (x: match<any>) => Promise<any>;
}

interface RouteConfig extends RouteProps {
  importSource: () => Promise<Page>;
}

function getRoutes(): RouteConfig[] {
  return [
    {
      path: '/',
      exact: true,
      importSource: importHome,
    },
    {
      path: '/articles/:article',
      importSource: importArticle,
    },
  ];
}

async function updateRoutesWithPreLoad(routes: RouteConfig[], currentPath: string): Promise<RouteProps[]> {
  return Promise.all(routes.map(async (route) => {
    const routeMath = matchPath(currentPath, route);

    let component;
    if (routeMath) {
      const { preLoadData, default: Com } = await route.importSource();
      if (preLoadData) {
        await preLoadData(routeMath);
      }
      component = Com;
    } else {
      component = lazy(route.importSource);
    }

    return { ...route, component };
  }));
}

async function getRouter(path: string): Promise<ReactElement<any>> {
  const routes = getRoutes();
  const routesWithPreLoad = await updateRoutesWithPreLoad(routes, path);

  const routeElements = routesWithPreLoad.map(
    (config) => <Route key={config.path as string} {...config} />,
  );

  return (
    <Router>
      <Suspense fallback={<div>...</div>}>
        <Switch>
          {routeElements}
        </Switch>
      </Suspense>
    </Router>
  );
}

export default getRouter;
