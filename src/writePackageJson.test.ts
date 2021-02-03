import fs from 'fs';
import path from 'path';

import { readPackageJson } from './readPackageJson';
import { writePackageJson } from './writePackageJson';

afterAll(() => {
  const file = path.join(__dirname, 'package.json');
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
});

it('package.json file', () => {
  const file = path.join(__dirname, 'package.json');
  const expected = { name: 'unit test' };
  writePackageJson(file, expected);

  const actual = readPackageJson(file);
  expect(actual).toEqual(expected);
});

it('package.json parent dir', () => {
  const expected = { name: 'unit test' };
  writePackageJson(__dirname, expected);

  const file = path.join(__dirname, 'package.json');
  const actual = readPackageJson(file);
  expect(actual).toEqual(expected);
});
