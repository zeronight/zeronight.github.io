import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
} from 'react-router-dom';

const loading = <div>...</div>;

const App = ({ routes }: { routes: RouteProps[] }) => (
  <Router>
    <Suspense fallback={loading}>
      <Switch>
        {routes.map(
          (route) => <Route key={route.path as string} {...route} />,
        )}
      </Switch>
    </Suspense>
  </Router>
);

export default App;
