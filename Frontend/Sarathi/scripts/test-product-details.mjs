// Bundle JSX with the project's existing Vite/esbuild toolchain, then run node:test.
import { build } from 'esbuild';
import { mkdtemp, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const directory = await mkdtemp(join(process.cwd(), '.product-tests-'));
try {
  const outfile = join(directory, 'tests.mjs');
  await build({ entryPoints: ['tests/product-details.test.jsx'], outfile, bundle: true,
    platform: 'node', format: 'esm', packages: 'external', logLevel: 'warning' });
  const result = spawnSync(process.execPath, ['--test', outfile], { stdio: 'inherit' });
  process.exitCode = result.status ?? 1;
} finally {
  await rm(directory, { recursive: true, force: true });
}
