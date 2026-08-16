const puppeteer = require('puppeteer');

(async () => {
    try {
        console.log('Testing Súper Fullget card and logo...');
        const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });

        // Click "Bordes Atérmicos" filter button
        await page.evaluate(() => {
            const btn = Array.from(document.querySelectorAll('.filter-pill')).find(b => b.innerText.includes('Bordes Atérmicos'));
            if (btn) btn.click();
        });

        await new Promise(r => setTimeout(r, 600));

        // Take screenshot of the Súper Fullget card
        const cardElement = await page.$('.product-card-horizontal[data-cat="bordes"]');
        if (cardElement) {
            await cardElement.screenshot({ path: 'C:/Users/franc/.gemini/antigravity/brain/582c4de2-545a-4dff-9c3a-03873c253b6d/test_superfullget_logo_fixed.png' });
        } else {
            await page.screenshot({ path: 'C:/Users/franc/.gemini/antigravity/brain/582c4de2-545a-4dff-9c3a-03873c253b6d/test_superfullget_logo_fixed.png' });
        }

        await browser.close();
        console.log('Test completed successfully!');
    } catch (e) {
        console.error(e);
    }
})();
