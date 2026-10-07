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

  // 1. Desktop Homepage (1280x800)
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'homepage_desktop.png') });
  console.log('Captured homepage_desktop.png');

  // 2. Mobile Homepage (390x844)
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'homepage_mobile.png') });
  console.log('Captured homepage_mobile.png');

  // 3. Mobile Stage Hub (390x844)
  await page.goto('http://localhost:3000/stage/second-trimester', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'stage_mobile.png') });
  console.log('Captured stage_mobile.png');

  // 4. Desktop Product Detail Page (1280x800)
  await page.setViewport({ width: 1280, height: 800, isMobile: false });
  await page.goto('http://localhost:3000/product/multigrain-laddu', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'pdp_desktop.png') });
  console.log('Captured pdp_desktop.png');

  // 5. Desktop Doctors Page (1280x800)
  await page.goto('http://localhost:3000/doctors', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'doctors_desktop.png') });
  console.log('Captured doctors_desktop.png');

  // 6. Desktop Claims Register (1280x800)
  await page.goto('http://localhost:3000/claims', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'claims_desktop.png') });
  console.log('Captured claims_desktop.png');

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
