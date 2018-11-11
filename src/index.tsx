import 'normalize.css';
import './style.css';

import ReactDOM from 'react-dom';
import getRouter from './router';

async function main() {
  const router = await getRouter(location.pathname);
  const container = document.getElementById('app');

  if (process.env.NODE_ENV === 'development') {
    ReactDOM.render(router, container);
  } else {
    ReactDOM.hydrate(router, container);
  }

  document.dispatchEvent(new Event('app-ready'));
}

main();
