import { JSDOM } from 'jsdom';

export function removeScriptTag(html: string): string {
  const dom = new JSDOM(html);

  const scriptNodes = [...dom.window.document.querySelectorAll('script')];

  scriptNodes.forEach((s) => (s.parentNode as Node).removeChild(s));

  return dom.serialize();
}

export function moveScriptTagToBody(html: string): string {
  const dom = new JSDOM(html);

  const head = dom.window.document.head;
  const body = dom.window.document.body;

  if (head && body) {
    const scriptNodes = [...head.querySelectorAll('script')];

    scriptNodes.forEach((s) => body.appendChild((s.parentNode as Node).removeChild(s)));
  }

  return dom.serialize();
}
