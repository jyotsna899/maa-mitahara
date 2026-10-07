import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function captureUnobstructed() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('https://benchmark-food-demo.myshopify.com', { waitUntil: 'networkidle2', timeout: 30000 });

  // Click 'YES' on age verification modal if present
  try {
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.innerText, btn);
      if (text && text.trim().toUpperCase() === 'YES') {
        console.log('Found YES button, clicking...');
        await btn.click();
        await new Promise(r => setTimeout(r, 1500));
        break;
      }
    }
  } catch (e) {
    console.log('Age verification bypass err:', e.message);
  }

  // Scroll smoothly down the page to trigger lazy-loaded images
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 100);
    });
  });

  await new Promise(r => setTimeout(r, 2000));

  const screenshotPath = 'C:\\Users\\jpriy\\.gemini\\antigravity\\brain\\bd2784be-ab09-49ab-8fbf-6c5ed60606a7\\ignite_peak_unobstructed.png';
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log('Saved unobstructed screenshot to:', screenshotPath);

  // Extract all sections with their detailed markup & text
  const sectionDetails = await page.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    // Find all immediate children of main or section containers
    const sections = Array.from(document.querySelectorAll('[id^="shopify-section-template"], section, .shopify-section')).map(el => {
      const h = el.querySelector('h1, h2, h3, h4, h5, h6')?.innerText?.trim();
      const p = el.querySelector('p')?.innerText?.trim();
      const imgs = Array.from(el.querySelectorAll('img')).map(img => img.src || img.getAttribute('srcset'));
      const buttons = Array.from(el.querySelectorAll('a.button, button, a[class*="btn"]')).map(b => b.innerText.trim()).filter(Boolean);
      return {
        id: el.id,
        className: el.className,
        heading: h,
        subheading: p,
        buttons,
        imageCount: imgs.length,
        textSnippet: el.innerText?.slice(0, 200)?.replace(/\s+/g, ' ')
      };
    });
    return sections;
  });

  fs.writeFileSync('scripts/peak-sections.json', JSON.stringify(sectionDetails, null, 2));
  console.log('Saved section details to scripts/peak-sections.json. Count:', sectionDetails.length);

  await browser.close();
}

captureUnobstructed().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
