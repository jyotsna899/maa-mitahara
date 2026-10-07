import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function inspectProductCard() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://benchmark-food-demo.myshopify.com', { waitUntil: 'networkidle2', timeout: 30000 });

  const cardData = await page.evaluate(() => {
    const card = document.querySelector('.card, [class*="product-card"], .card-wrapper');
    if (!card) return 'Card not found';
    return {
      outerHTML: card.outerHTML.slice(0, 3000),
      classes: card.className,
      badge: card.querySelector('.badge, [class*="badge"]')?.innerText,
      title: card.querySelector('.card__heading, [class*="title"]')?.innerText,
      price: card.querySelector('.price, [class*="price"]')?.innerText?.replace(/\s+/g, ' '),
      buttons: Array.from(card.querySelectorAll('button, a')).map(b => b.innerText.trim()).filter(Boolean)
    };
  });

  fs.writeFileSync('scripts/card-data.json', JSON.stringify(cardData, null, 2));
  console.log('Saved card data:', cardData.title);

  await browser.close();
}

inspectProductCard().catch(console.error);
