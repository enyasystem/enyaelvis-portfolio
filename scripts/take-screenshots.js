const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

const projects = [
  { url: 'https://boosterbaseng.com', name: 'boosterbase' },
  { url: 'https://accesscapitalmic.com', name: 'access-capital' },
  { url: 'https://iecservices.org', name: 'iec-services' },
  { url: 'https://miltonhighschool.ng', name: 'milton-high-school' },
  { url: 'https://boxedwater.ng', name: 'boxed-water' },
  { url: 'https://jeasonsteel.com', name: 'jeason-steel' },
  { url: 'https://ggcleanexperts.com', name: 'gg-clean-experts' },
  { url: 'https://endvre.com', name: 'endvre' },
  { url: 'https://rsnewsng.com', name: 'rs-news' }
];

async function takeScreenshots() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Set viewport to 16:9 aspect ratio
  await page.setViewport({ width: 1200, height: 630 });

  for (const project of projects) {
    try {
      console.log(`Taking screenshot of ${project.url}...`);
      await page.goto(project.url, { waitUntil: 'networkidle0', timeout: 30000 });
      
      // Wait an additional second for any animations
      await page.waitForTimeout(1000);
      
      const screenshotPath = path.join(__dirname, '..', 'public', 'projects', `${project.name}.jpg`);
      await page.screenshot({
        path: screenshotPath,
        type: 'jpeg',
        quality: 80
      });
      
      console.log(`✓ Saved screenshot for ${project.name}`);
    } catch (error) {
      console.error(`✗ Failed to take screenshot of ${project.url}:`, error.message);
    }
  }

  await browser.close();
}

takeScreenshots().catch(console.error);
