import removeScript from '../removeScript';

const sourceHtml = `
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
</body>
</html>
`;

const expectHtml = `
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

function minify(html: string): string {
  return (html.match(/<[^>]+>/g) as string[]).join('');
}

it('should works', () => {
  expect(minify(removeScript(sourceHtml))).toBe(minify(expectHtml));
});
