#!/usr/bin/env node

import browserslist from 'browserslist';
import { browserslistToESVersion } from './index.js';

const args = process.argv.slice(2);

// Show help for --help or -h
if (args.includes('--help') || args.includes('-h')) {
	console.log(`
browserslist-to-es-version

Usage:
  npx browserslist-to-es-version [query]

Arguments:
  query    Optional browserslist query (default: reads from local config)

Examples:
  npx browserslist-to-es-version
  npx browserslist-to-es-version "Chrome >= 80, Firefox >= 72"
`);
	process.exit(0);
}

try {
	let browsers: string[];

	if (args.length > 0) {
		// Use provided query
		browsers = browserslist(args.join(' '));
	} else {
		// Check if there's a local browserslist config
		const configFile = browserslist.findConfigFile('.');
		if (!configFile) {
			console.error(
				'Error: No browserslist configuration found.\n\n' +
					'Create a .browserslistrc file or add a "browserslist" field to package.json.\n' +
					'Alternatively, provide a query as an argument:\n' +
					'  npx browserslist-to-es-version "Chrome >= 80, Firefox >= 72"',
			);
			process.exit(1);
		}

		// Read from local browserslist config
		browsers = browserslist();
	}

	const esVersion = browserslistToESVersion(browsers);
	console.log(esVersion);
} catch (error) {
	console.error(
		'Error:',
		error instanceof Error ? error.message : String(error),
	);
	process.exit(1);
}
