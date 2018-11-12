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

type MutableScriptKey = 'type' | 'defer' | 'async';
type MutableScriptAttributes = Partial<Pick<HTMLScriptElement, MutableScriptKey>>;
type MutableScriptAtttrbutesToSet = Partial<Record<keyof MutableScriptAttributes, string>>;

type MSK = MutableScriptKey;
type MSA = MutableScriptAttributes;
type MSATS = MutableScriptAtttrbutesToSet;

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
