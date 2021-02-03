import fs from 'fs';
import path from 'path';

/**
 * `JSON.stringify` the specified `data` and save it as `package.json` file at
 * given path.
 *
 * @param dir The file path or parent directory of `package.json` to write.
 * @param data The JSON object data of the `package.json`.
 */
export const writePackageJson = (dir: string, data: object) => {
  const file = dir.endsWith('package.json')
    ? dir
    : path.join(dir, 'package.json');
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync(file, json, { encoding: 'utf8' });
};
