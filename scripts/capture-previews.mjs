import { chromium } from 'playwright';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assets = resolve(__dirname, '..', 'src', 'assets');

// Each target is captured into `<name>-preview.webp`, which Projects.astro
// picks up automatically for the matching featured project. Only live apps
// whose landing page IS a good preview belong here — tidalwave's public page
// is a login gate, so its dashboard preview is made by capture-tidalwave-demo.
const targets = [
  { name: 'linkhop', url: 'https://linkhop.paul.wtf' }
];

// On NixOS the bundled Chromium won't run (dynamic linking). Point BROWSER_BIN
// at any Chromium-family binary instead, e.g. `BROWSER_BIN=$(which brave)`.
const executablePath = process.env.BROWSER_BIN || undefined;

let browser;
try {
  browser = await chromium.launch({ executablePath });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2,
    colorScheme: 'dark'
  });

  for (const { name, url } of targets) {
    const out = resolve(assets, `${name}-preview.webp`);
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(800);
      const png = await page.screenshot({ type: 'png', fullPage: false });
      await sharp(png).webp({ quality: 82 }).toFile(out);
      console.log('Wrote', out);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser?.close();
}
