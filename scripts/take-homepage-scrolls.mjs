import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\jpriy\\.gemini\\antigravity\\brain\\bd2784be-ab09-49ab-8fbf-6c5ed60606a7';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();

  // Desktop Full Page (1280px)
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'homepage_desktop_full.png'), fullPage: true });
  console.log('Captured homepage_desktop_full.png');

  // Mobile Full Page (390px)
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'homepage_mobile_full.png'), fullPage: true });
  console.log('Captured homepage_mobile_full.png');

  // Desktop Viewport Hero & Stage Discovery
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'homepage_desktop_hero.png') });
  console.log('Captured homepage_desktop_hero.png');

  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
