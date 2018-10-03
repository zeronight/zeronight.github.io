import removeScript from '../removeScript';

const html = `
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

it('should works', () => {
  expect(/script/i.test(removeScript(html))).toBe(false);
});
