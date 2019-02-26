interface Window {
  __JEST_VARS__: {
    HTMLMutated: boolean
    appReady: boolean
  }
}

const pages = [
  {
    name: 'home page',
    route: '/'
  },
  {
    name: 'article page',
    route: '/articles/property-accessor-of-ecmascript'
  },
];

describe('prerender should works', () => {
  beforeAll(async () => {
    await page.evaluateOnNewDocument(() => {
      const readyEvent = 'app-ready';
      const rootSelector = '#app';

      window.__JEST_VARS__ = window.__JEST_VARS__ || {};

      window.__JEST_VARS__.HTMLMutated = false;
      const mutateCallBack = () => { window.__JEST_VARS__.HTMLMutated = true; };

      const observer = new MutationObserver(mutateCallBack);
      document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.querySelector(rootSelector) as HTMLElement, {
          attributes: true,
          characterData: true,
          childList: true,
          subtree: true,
        });
      });

      window.__JEST_VARS__.appReady = false;
      document.addEventListener(readyEvent, () => {
        window.__JEST_VARS__.appReady = true;
        Promise.resolve().then(
          () => observer.disconnect()
        );
      });
    });
  });

  pages.forEach(({ name, route }) => {
    it(name, async () => {
      await page.goto(`http://127.0.0.1:8080${route}`);

      await page.waitFor(() => window.__JEST_VARS__.appReady, { timeout: 10000 });

      const hasHtmlMutate = await page.evaluate(() => window.__JEST_VARS__.HTMLMutated);

      expect(hasHtmlMutate).toBe(false);
    }, 20000);
  });
});
