import path from 'path';

import { readPackageJson } from './readPackageJson';

it('package.json file', () => {
  const file = path.join(__dirname, '..', 'package.json');
  const actual = readPackageJson(path.resolve(file));
  expect(actual.name).toEqual('upgrade-js-packages');
});

it('package.json parent dir', () => {
  const dir = path.dirname(__dirname);
  const actual = readPackageJson(dir);
  expect(actual.name).toEqual('upgrade-js-packages');
});
