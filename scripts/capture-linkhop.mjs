import { chromium } from 'playwright';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '..', 'src', 'assets', 'linkhop-preview.webp');

const URL = 'https://linkhop.paul.wtf';

let browser;
try {
  browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2,
    colorScheme: 'dark'
  });
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const png = await page.screenshot({ type: 'png', fullPage: false });
  await sharp(png).webp({ quality: 82 }).toFile(out);
  console.log('Wrote', out);
} finally {
  await browser?.close();
}
