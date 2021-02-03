import { getNewPackageVersion } from './getNewPackageVersion';

it('current version found', () => {
  expect(getNewPackageVersion('react', '^16.0.0')).toEqual('^16.14.0');
});

it('no newer version', () => {
  expect(getNewPackageVersion('react', '^2021.0.0')).toEqual('^2021.0.0');
});

it('package not found', () => {
  expect(() =>
    getNewPackageVersion('the-package-not-exist', '^16.0.0'),
  ).toThrow();
});
