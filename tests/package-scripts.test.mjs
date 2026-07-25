import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const packageJson = JSON.parse(
  await readFile(new URL('../package.json', import.meta.url), 'utf8'),
);

test('dev runs the CV and the admin side by side', () => {
  assert.equal(
    packageJson.scripts.dev,
    'concurrently -n CV,ADMIN -c blue,magenta "astro dev --port 4321" "npm --prefix admin start"',
  );
});

test('cv starts only the Astro frontend', () => {
  assert.equal(packageJson.scripts.cv, 'astro dev --port 4321');
});

test('admin commands delegate to the env-aware admin start script', () => {
  assert.equal(packageJson.scripts.admin, 'npm --prefix admin start');
  assert.doesNotMatch(packageJson.scripts.admin, /node server\.js/);
  assert.doesNotMatch(packageJson.scripts.dev, /node server\.js/);
});
