import compareVersions from 'compare-versions';
import { getPackageInfo } from 'node-build-tools';

const REGEX_SEMVER = /^\d+\.\d+\.\d+$/;

/**
 * Get new version string for the specified package.
 * @param packageName The name of the package.
 * @param currentVersion Current version string, e.g. `^16.14.0`.
 */
export const getNewPackageVersion = (
  packageName: string,
  currentVersion: string,
) => {
  const { log } = console;
  (console as any).log = () => {};
  const allVersions = getPackageInfo(packageName, ['versions'], undefined, {
    stdio: 'pipe',
  }) as string[];
  (console as any).log = log;
  const reversedVersions = allVersions
    .filter((v) => REGEX_SEMVER.test(v))
    .sort((a, b) => -compareVersions(a, b));
  const prefix = currentVersion.replace(/[^\d.]/g, '').split('.', 1)[0] + '.';

  console.log(reversedVersions);

  const currentVersionNoPrefix = currentVersion.replace(/^\D+/g, '');
  for (const version of reversedVersions) {
    if (
      version.startsWith(prefix) &&
      compareVersions(version, currentVersionNoPrefix) > 0
    ) {
      return `^${version}`;
    }
  }

  return currentVersion;
};
