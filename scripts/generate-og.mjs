import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '..', 'public', 'og-image.png');

const W = 1200;
const H = 630;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="a" cx="20%" cy="25%" r="60%">
      <stop offset="0%" stop-color="rgb(168,220,255)" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="rgb(168,220,255)" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="b" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="rgb(103,232,249)" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="rgb(103,232,249)" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="c" cx="55%" cy="95%" r="60%">
      <stop offset="0%" stop-color="rgb(94,234,212)" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="rgb(94,234,212)" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="#0b0814"/>
  <rect width="100%" height="100%" fill="url(#a)"/>
  <rect width="100%" height="100%" fill="url(#b)"/>
  <rect width="100%" height="100%" fill="url(#c)"/>
  <text x="80" y="340"
        font-family="Georgia, serif"
        font-size="120"
        fill="rgba(255,255,255,0.94)">
    Paul <tspan font-style="italic" fill="#88d8ff">Reitmayer</tspan>
  </text>
  <text x="82" y="400"
        font-family="sans-serif"
        font-size="32"
        fill="rgba(255,255,255,0.62)">
    Elektrotechniker · Software-Engineering als Hobby
  </text>
  <text x="82" y="560"
        font-family="monospace"
        font-size="22"
        fill="rgba(255,255,255,0.42)">
    paul.wtf
  </text>
</svg>
`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log('Wrote', out);
