import fs from 'fs';
import os from 'os';
import path from 'path';
import writeJsonToFile from '../writeJsonToFile';

const fsp = fs.promises;

let tempDir: string;

beforeAll(async () => {
  tempDir = await fsp.mkdtemp(path.resolve(os.tmpdir(), 'write-json-to-file'));
});

afterAll(() => fsp.rmdir(tempDir));

const data = {
  'empty-object': {},
  'normal-object': { a: 1, b: 'x', c: true, d: null, f: undefined },
  number: 0,
  string: '',
  boolean: false,
  null: null,
};

it('should works', async () => {
  const nameAndContent = Object.entries(data);
  expect.assertions(nameAndContent.length);

  await Promise.all(nameAndContent.map(async ([filename, value]) => {
    const filePath = path.resolve(tempDir, filename);
    await writeJsonToFile(value, filePath);
    const content = await fsp.readFile(filePath, 'utf-8');
    expect(content).toBe(JSON.stringify(value));
    await fsp.unlink(filePath);
  }));
});

it('should throw error with undefined', async () => {
  expect.assertions(1);

  try {
    await writeJsonToFile(undefined, tempDir);
  } catch (e) {
    expect(true).toBe(true);
  }
});
