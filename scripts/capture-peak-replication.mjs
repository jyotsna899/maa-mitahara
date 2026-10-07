import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const brainDir = 'C:\\Users\\jpriy\\.gemini\\antigravity\\brain\\bd2784be-ab09-49ab-8fbf-6c5ed60606a7';

async function capture() {
  console.log('Launching browser to capture replicated pages...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Desktop Homepage Full-Page
  console.log('Capturing Desktop Homepage...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({
    path: path.join(brainDir, 'homepage_desktop_exact_peak.png'),
    fullPage: true
  });
  console.log('Desktop Homepage captured.');

  // 2. Mobile Homepage Full-Page
  console.log('Capturing Mobile Homepage...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({
    path: path.join(brainDir, 'homepage_mobile_exact_peak.png'),
    fullPage: true
  });
  console.log('Mobile Homepage captured.');

  // 3. Desktop PDP Full-Page
  console.log('Capturing Desktop PDP...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000/product/orange-and-cacao-laddu', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({
    path: path.join(brainDir, 'pdp_desktop_exact_peak.png'),
    fullPage: true
  });
  console.log('Desktop PDP captured.');

  // 4. Desktop Stage Hub
  console.log('Capturing Desktop Stage Hub...');
  await page.goto('http://localhost:3000/stage/second-trimester', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({
    path: path.join(brainDir, 'stage_desktop_exact_peak.png'),
    fullPage: true
  });
  console.log('Desktop Stage Hub captured.');

  // 5. Desktop Doctors Advisory
  console.log('Capturing Desktop Doctors Advisory...');
  await page.goto('http://localhost:3000/doctors', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({
    path: path.join(brainDir, 'doctors_desktop_exact_peak.png'),
    fullPage: true
  });
  console.log('Desktop Doctors captured.');

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
