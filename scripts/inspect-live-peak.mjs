import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function inspectDemo() {
  console.log('Launching browser to inspect benchmark-food-demo...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to https://benchmark-food-demo.myshopify.com ...');
  try {
    await page.goto('https://benchmark-food-demo.myshopify.com', { waitUntil: 'networkidle2', timeout: 30000 });
  } catch (e) {
    console.log('Navigation warning:', e.message);
  }

  // Take screenshot
  const screenshotPath = 'C:\\Users\\jpriy\\.gemini\\antigravity\\brain\\bd2784be-ab09-49ab-8fbf-6c5ed60606a7\\ignite_peak_live_demo.png';
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log('Saved live demo screenshot to:', screenshotPath);

  // Extract page structure, section headings, class names, DOM elements
  const data = await page.evaluate(() => {
    // Collect all section or main elements
    const sections = Array.from(document.querySelectorAll('section, main > div, [class*="section"]')).map(el => {
      const heading = el.querySelector('h1, h2, h3, h4')?.innerText?.trim();
      return {
        tag: el.tagName,
        id: el.id,
        className: el.className,
        heading: heading || null,
        textSnippet: el.innerText?.slice(0, 100)?.replace(/\n+/g, ' ')
      };
    });

    // Collect header nav links
    const navLinks = Array.from(document.querySelectorAll('header a, nav a')).map(a => ({
      text: a.innerText?.trim(),
      href: a.getAttribute('href')
    })).filter(x => x.text);

    // Collect color scheme / font styles
    const bodyStyles = window.getComputedStyle(document.body);
    const fonts = {
      bodyFont: bodyStyles.fontFamily,
      bgColor: bodyStyles.backgroundColor,
      color: bodyStyles.color
    };

    return { sections, navLinks, fonts };
  });

  fs.writeFileSync('scripts/demo-data.json', JSON.stringify(data, null, 2));
  console.log('Saved demo data to scripts/demo-data.json. Total sections identified:', data.sections.length);

  await browser.close();
}

inspectDemo().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
