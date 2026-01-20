import browserslist from 'browserslist';
import { browsersToESVersion } from './core.js';

export type { ESVersion } from './core.js';

export function browserslistToESVersion(browsers: string[]) {
  const projectBrowsers = browserslist(browsers, {
    ignoreUnknownVersions: true,
  });
  return browsersToESVersion(projectBrowsers);
}
