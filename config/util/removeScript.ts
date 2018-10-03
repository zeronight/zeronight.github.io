import { JSDOM } from 'jsdom';

function removeScriptTag(html: string) {
  const dom = new JSDOM(html);

  const scriptNodes = [...dom.window.document.querySelectorAll('script')];

  scriptNodes.forEach((s) => (s.parentNode as Node).removeChild(s));

  const documentElement = dom.window.document.documentElement;

  return documentElement ? documentElement.innerHTML : '';
}

export default removeScriptTag;
