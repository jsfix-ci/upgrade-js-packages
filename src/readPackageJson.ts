import fs from 'fs';
import path from 'path';

/**
 * Read `package.json` file at specified path as JSON object.
 * @param dir The file path or parent directory of `package.json` to read.
 * @returns JSON object of the `package.json` file.
 */
export const readPackageJson = (dir: string) => {
  const file = dir.endsWith('package.json')
    ? dir
    : path.join(dir, 'package.json');
  const json = fs.readFileSync(file, { encoding: 'utf8' });
  return JSON.parse(json);
};
