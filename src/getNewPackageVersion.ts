import compareVersions from 'compare-versions';
import { getPackageInfo } from 'node-build-tools';

/**
 * Get new version string for the specified package.
 * @param packageName The name of the package.
 * @param currentVersion Current version string, e.g. `^16.14.0`.
 */
export const getNewPackageVersion = (
  packageName: string,
  currentVersion: string,
) => {
  const allVersions = getPackageInfo(
    packageName,
    ['versions'],
    undefined,
    true,
  ) as string[];
  const reversedVersions = allVersions.sort((a, b) => -compareVersions(a, b));
  const prefix = currentVersion.replace(/[^\d.]/g, '').split('.', 1)[0] + '.';

  console.log(reversedVersions);

  for (const version of reversedVersions) {
    if (version.startsWith(prefix)) {
      return `^${version}`;
    }
  }

  throw new Error(
    `Package ${packageName} of version ${currentVersion} does not exist.`,
  );
};
