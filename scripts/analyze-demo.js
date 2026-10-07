const fs = require('fs');

const content = fs.readFileSync('C:/Users/jpriy/.gemini/antigravity/brain/bd2784be-ab09-49ab-8fbf-6c5ed60606a7/.system_generated/steps/323/content.md', 'utf8');

// Look for sections in body
const bodyIdx = content.indexOf('<body');
const body = content.substring(bodyIdx);

// Find all shopify sections: id="shopify-section-..."
const sectionDivs = [...body.matchAll(/<div[^>]*id="shopify-section-([^"]+)"[^>]*>/gi)].map(m => m[1]);
console.log('Shopify Section IDs (' + sectionDivs.length + '):');
sectionDivs.forEach(s => console.log(' - ' + s));

// Find all custom tags (like <cart-drawer>, <slideshow-component>, etc.)
const customTags = [...body.matchAll(/<([a-z0-9]+-[a-z0-9]+)[^>]*>/gi)].map(m => m[1]);
console.log('\nCustom Elements:', Array.from(new Set(customTags)));

// Find all headings
const headings = [...body.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
console.log('\nHeadings count:', headings.length);
console.log('Sample headings:', headings.slice(0, 20));

// Find all buttons or CTAs
const buttons = [...body.matchAll(/<a[^>]*class="[^"]*button[^"]*"[^>]*>([\s\S]*?)<\/a>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
console.log('\nButtons:', Array.from(new Set(buttons)));


