export default function fetchJson(input: RequestInfo, init?: RequestInit) {
  return fetch(input, init).then((d) => d.json());
}
