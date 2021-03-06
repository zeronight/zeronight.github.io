import { JSDOM } from 'jsdom';

export function removeScriptTag(html: string): string {
  const dom = new JSDOM(html);

  const scriptNodes = [...dom.window.document.querySelectorAll('script')];

  scriptNodes.forEach((s) => (s.parentNode as Node).removeChild(s));

  return dom.serialize();
}

export function moveScriptTagToBody(html: string): string {
  const dom = new JSDOM(html);

  const { head, body } = dom.window.document;

  if (head && body) {
    const scriptNodes = [...head.querySelectorAll('script')];

    scriptNodes.forEach((s) => body.appendChild((s.parentNode as Node).removeChild(s)));
  }

  return dom.serialize();
}

type MutableScriptKey = 'type' | 'defer' | 'async';
type MutableScriptAttributes = Partial<Pick<HTMLScriptElement, MutableScriptKey>>;

type MSK = MutableScriptKey;
type MSA = MutableScriptAttributes;

function setAttribute(script: HTMLScriptElement, key: MSK, value: MSA[MSK]) {
  if (typeof value === 'string') {
    script.setAttribute(key, value);
    return;
  }

  if (value) {
    script.setAttribute(key, '');
  }
}

export function setScriptAttributes(html: string, attributes: MSA) {
  const dom = new JSDOM(html);
  const scriptNodes = [...dom.window.document.scripts];
  const attributesKeys = Object.keys(attributes) as MSK[];

  scriptNodes
    .filter((s) => s.src !== undefined && s.src !== '')
    .forEach((s) => attributesKeys.forEach((k) => setAttribute(s, k, attributes[k])));

  return dom.serialize();
}
