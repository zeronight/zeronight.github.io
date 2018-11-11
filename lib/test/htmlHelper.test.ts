import { removeScriptTag, moveScriptTagToBody } from '../htmlHelper';

const sourceHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Test</title>
  <script src="dist/preload-main.js"></script><script src="dist/preload-test.js"></script>
  <script src="dist/preload-main2.js">
  <SCRIPT>
    console.log('preload-ok');
  </SCRIPT>
</head>
<body>
  <section id="app"></section>
  <script src="dist/main.js"></script><script src="dist/test.js"></script>
  <script src="dist/main2.js">
  <SCRIPT>
    console.log('ok');
  </SCRIPT>
</body>
</html>
`;

const expectWithoutScript = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Test</title>
</head>
<body>
  <section id="app"></section>
</body>
</html>
`;

const expectScriptInbody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Test</title>
</head>
<body>
  <section id="app"></section>
  <script src="dist/main.js"></script><script src="dist/test.js"></script>
  <script src="dist/main2.js">
  <SCRIPT>
    console.log('ok');
  </SCRIPT>
  <script src="dist/preload-main.js"></script><script src="dist/preload-test.js"></script>
  <script src="dist/preload-main2.js">
  <SCRIPT>
    console.log('preload-ok');
  </SCRIPT>
</body>
</html>
`;

function minify(html: string): string {
  return (html.match(/<[^>]+>/g) as string[]).join('').toLocaleLowerCase();
}

it('removeScriptTag should works', () => {
  expect(minify(removeScriptTag(sourceHtml))).toBe(minify(expectWithoutScript));
});

it('moveScriptTagToBody should works', () => {
  expect(minify(moveScriptTagToBody(sourceHtml))).toBe(minify(expectScriptInbody));
});
