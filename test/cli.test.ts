import { exec } from 'node:child_process';
import { mkdtemp, rmdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { assert, test } from '@rstest/core';

const execAsync = promisify(exec);

// Helper to strip ANSI color codes
function stripAnsi(str: string): string {
	const ansiEscape = String.fromCharCode(27);
	const ansiRegex = new RegExp(`${ansiEscape}\[[0-9;]*m`, 'g');
	return str.replace(ansiRegex, '');
}

test('CLI should return ES version for custom query', async () => {
	const { stdout } = await execAsync('node dist/cli.js "Chrome >= 85"');
	assert.strictEqual(stripAnsi(stdout).trim(), '2021');
});

test('CLI should show help when --help is passed', async () => {
	const { stdout } = await execAsync('node dist/cli.js --help');
	assert.ok(stdout.includes('Usage:'));
	assert.ok(stdout.includes('npx browserslist-to-es-version'));
});

test('CLI should handle multiple browser queries', async () => {
	const { stdout } = await execAsync(
		'node dist/cli.js "Chrome >= 80, Firefox >= 72"',
	);
	assert.strictEqual(stripAnsi(stdout).trim(), '2017');
});

test('CLI should read .browserslistrc config', async () => {
	// Create temporary directory
	const tempDir = await mkdtemp(join(tmpdir(), 'browserslist-test-'));

	try {
		// Create .browserslistrc file
		await writeFile(
			join(tempDir, '.browserslistrc'),
			'Chrome >= 80\nFirefox >= 72',
		);

		// Run CLI in temp directory
		const { stdout } = await execAsync(
			`cd "${tempDir}" && node "${process.cwd()}/dist/cli.js"`,
		);
		assert.strictEqual(stripAnsi(stdout).trim(), '2017');
	} finally {
		// Cleanup
		await rmdir(tempDir, { recursive: true });
	}
});

test('CLI should read browserslist from package.json', async () => {
	// Create temporary directory
	const tempDir = await mkdtemp(join(tmpdir(), 'browserslist-test-'));

	try {
		// Create package.json with browserslist config
		await writeFile(
			join(tempDir, 'package.json'),
			JSON.stringify(
				{
					name: 'test',
					browserslist: ['Chrome >= 85', 'Firefox >= 78'],
				},
				null,
				2,
			),
		);

		// Run CLI in temp directory
		const { stdout } = await execAsync(
			`cd "${tempDir}" && node "${process.cwd()}/dist/cli.js"`,
		);
		assert.strictEqual(stripAnsi(stdout).trim(), '2019');
	} finally {
		// Cleanup
		await rmdir(tempDir, { recursive: true });
	}
});

test('CLI should error when no browserslist config is found', async () => {
	// Create empty temporary directory
	const tempDir = await mkdtemp(join(tmpdir(), 'browserslist-test-'));

	try {
		// Run CLI in empty temp directory (should fail)
		const { stderr, stdout } = await execAsync(
			`cd "${tempDir}" && node "${process.cwd()}/dist/cli.js"`,
			{ encoding: 'utf8' },
		).catch((error) => {
			// exec throws on non-zero exit code, but we want to capture the output
			return { stderr: error.stderr || '', stdout: error.stdout || '' };
		});

		const output = stderr || stdout;
		assert.ok(output.includes('No browserslist configuration found'));
		assert.ok(output.includes('Create a .browserslistrc file'));
	} finally {
		// Cleanup
		await rmdir(tempDir, { recursive: true });
	}
});
