import { program as commander } from 'commander';

import { getNewPackageVersion } from './getNewPackageVersion';
import { readPackageJson } from './readPackageJson';
import { writePackageJson } from './writePackageJson';

type DependencyList = { [packageName: string]: string };
type PackageJson = { [field: string]: DependencyList };

const upgrade = (packageJson: PackageJson, packageJsonField: string) => {
  const packages = packageJson[packageJsonField];
  const entries = packages ? Object.entries(packages) : [];
  if (entries.length === 0) {
    console.log(`There isn't any "${packageJsonField}".\n`);
    return;
  }

  console.log(`Upgrading "${packageJsonField}"...`);
  for (const [name, version] of entries) {
    process.stdout.write(`\t${name}...`);
    packages[name] = getNewPackageVersion(name, version);
    console.log(packages[name]);
  }
  console.log('Done.');
};

export const upgradePackages = () => {
  commander
    .version('0.1.0')
    .arguments('<path>')
    .description('Upgrade packages in your package.json to latest.', {
      path: 'Path to your package.json file.',
    })
    .parse(process.argv);

  if (!process.argv.slice(2).length) {
    commander.outputHelp();
    return;
  }

  const packageJsonFile = (commander as any).path || process.cwd();
  const packageJson = readPackageJson(packageJsonFile) as PackageJson;

  ['peerDependencies', 'devDependencies', 'dependencies'].forEach((field) =>
    upgrade(packageJson, field),
  );
  writePackageJson(packageJsonFile, packageJson);
};
