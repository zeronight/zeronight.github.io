import fs, { PathLike } from 'fs';

const fsp = fs.promises;

export default async function writeJsonToFile(data: any, file: PathLike) {
  if (data === undefined) {
    throw new Error('You can not write undefined to file');
  }

  return fsp.writeFile(file, JSON.stringify(data), 'utf-8');
}
