// scripts/subset-fonts.mjs — subset variable/static fonts to a latin woff2.
// Self-hosting fonts (no third-party calls) is required for speed + GDPR.
//
// Requires fonttools + brotli (one-time):  python3 -m pip install --user fonttools brotli
//
// Usage:
//   node scripts/subset-fonts.mjs <input.ttf> <output-name>
//   e.g. node scripts/subset-fonts.mjs _fontsrc/Inter.ttf Inter-latin
// Output lands in public/fonts/<output-name>.woff2. Then wire an @font-face in
// src/styles/tokens.css pointing at /fonts/<output-name>.woff2.
//
// For variable fonts, pin any axes you don't need first, e.g.:
//   python3 -m fontTools.varLib.instancer in.ttf opsz=40 -o pinned.ttf
import { execFileSync } from 'node:child_process';

const LATIN =
  'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,' +
  'U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';

const [input, name] = process.argv.slice(2);
if (!input || !name) {
  console.error('Usage: node scripts/subset-fonts.mjs <input.ttf> <output-name>');
  process.exit(1);
}
const out = `public/fonts/${name}.woff2`;
execFileSync(
  'python3',
  [
    '-m',
    'fontTools.subset',
    input,
    `--unicodes=${LATIN}`,
    '--layout-features=*',
    '--flavor=woff2',
    `--output-file=${out}`,
  ],
  { stdio: 'inherit' }
);
console.log(`✓ wrote ${out}`);
