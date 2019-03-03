import 'normalize.css';
import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import getRoutes from './routes';

async function main() {
  const container = document.getElementById('app');
  const routes = await getRoutes(window.location.pathname);
  const app = <App routes={routes} />;

  if (process.env.NODE_ENV === 'development') {
    ReactDOM.render(app, container);
  } else {
    ReactDOM.hydrate(app, container);
  }

  document.dispatchEvent(new Event('app-ready'));
}

main();
