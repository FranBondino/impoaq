const puppeteer = require('puppeteer');

(async () => {
    try {
        console.log('Auditing all 5 product card logos in catalog...');
        const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.setViewport({ width: 1440, height: 1600 });
        await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });

        // Scroll to products
        await page.evaluate(() => {
            const el = document.getElementById('productos');
            if (el) el.scrollIntoView();
        });
        await new Promise(r => setTimeout(r, 600));

        // Take screenshot of the products section
        const prodSection = await page.$('#productos');
        if (prodSection) {
            await prodSection.screenshot({ path: 'C:/Users/franc/.gemini/antigravity/brain/582c4de2-545a-4dff-9c3a-03873c253b6d/audit_all_5_logos.png' });
        }

        await browser.close();
        console.log('Captured audit_all_5_logos.png successfully!');
    } catch (e) {
        console.error(e);
    }
})();
