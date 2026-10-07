import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function inspectHeaderAndPdp() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://benchmark-food-demo.myshopify.com', { waitUntil: 'networkidle2', timeout: 30000 });

  const headerHtml = await page.evaluate(() => {
    const el = document.querySelector('header, [class*="section-header"]');
    return el ? el.outerHTML : 'Header not found';
  });

  fs.writeFileSync('scripts/header.html', headerHtml);
  console.log('Saved header.html, length:', headerHtml.length);

  await browser.close();
}

inspectHeaderAndPdp().catch(console.error);
