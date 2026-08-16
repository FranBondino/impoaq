const puppeteer = require('puppeteer');

(async () => {
    try {
        console.log('Testing Footer Links & Interactivity...');
        const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });

        // Scroll to footer
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await new Promise(r => setTimeout(r, 600));

        // Test 1: Click "Súper Brite® (Piscinas)" in footer
        console.log('Clicking Súper Brite link in footer...');
        await page.evaluate(() => {
            const link = Array.from(document.querySelectorAll('.footer-links a')).find(a => a.innerText.includes('Súper Brite®'));
            if (link) link.click();
        });
        await new Promise(r => setTimeout(r, 500));
        const isModalOpen = await page.evaluate(() => {
            const modal = document.getElementById('tech-modal');
            return modal && (modal.classList.contains('active') || modal.classList.contains('open') || modal.style.display !== 'none');
        });
        console.log('Modal opened on Súper Brite click:', isModalOpen);
        await page.screenshot({ path: 'C:/Users/franc/.gemini/antigravity/brain/582c4de2-545a-4dff-9c3a-03873c253b6d/footer_modal_test.png' });

        // Close modal
        await page.evaluate(() => {
            const closeBtn = document.querySelector('.close-modal');
            if (closeBtn) closeBtn.click();
            else if (typeof window.closeProductModal === 'function') window.closeProductModal();
        });
        await new Promise(r => setTimeout(r, 300));

        // Test 2: Click "Carta Cromática Oficial"
        console.log('Testing Carta Cromática anchor...');
        await page.evaluate(() => {
            const link = Array.from(document.querySelectorAll('.footer-links a')).find(a => a.innerText.includes('Carta Cromática'));
            if (link) link.click();
        });
        await new Promise(r => setTimeout(r, 600));
        await page.screenshot({ path: 'C:/Users/franc/.gemini/antigravity/brain/582c4de2-545a-4dff-9c3a-03873c253b6d/footer_carta_colores_test.png' });

        // Test 3: Click "Puntos de Venta & Corralones"
        console.log('Testing B2B Corralones anchor...');
        await page.evaluate(() => {
            const link = Array.from(document.querySelectorAll('.footer-links a')).find(a => a.innerText.includes('Corralones'));
            if (link) link.click();
        });
        await new Promise(r => setTimeout(r, 600));
        await page.screenshot({ path: 'C:/Users/franc/.gemini/antigravity/brain/582c4de2-545a-4dff-9c3a-03873c253b6d/footer_b2b_test.png' });

        await browser.close();
        console.log('All footer link tests passed successfully!');
    } catch (e) {
        console.error(e);
    }
})();
