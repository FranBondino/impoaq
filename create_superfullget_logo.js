const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
        const page = await browser.newPage();
        
        await page.setViewport({ width: 1600, height: 800, deviceScaleFactor: 2 });

        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,800;0,900;1,900&display=swap" rel="stylesheet">
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    background: transparent;
                    display: inline-flex;
                    padding: 15px 30px;
                    font-family: 'Montserrat', sans-serif;
                }
                .logo-container {
                    display: inline-flex;
                    align-items: center;
                    gap: 30px;
                    background: #FFFFFF;
                    padding: 16px 28px;
                    border-radius: 12px;
                }
                .logo-badge {
                    width: 200px;
                    height: 200px;
                    background-color: #D97706;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .logo-badge-text {
                    color: #FFFFFF;
                    font-size: 110px;
                    font-weight: 900;
                    font-style: italic;
                    display: flex;
                    align-items: baseline;
                    line-height: 1;
                    letter-spacing: -3px;
                }
                .logo-badge-text .small-s {
                    font-size: 68px;
                    font-weight: 900;
                    margin-right: -4px;
                }
                .logo-text-col {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                .text-super {
                    font-size: 68px;
                    font-weight: 900;
                    font-style: italic;
                    color: #0369A1;
                    line-height: 0.95;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                }
                .text-fullget {
                    font-size: 116px;
                    font-weight: 900;
                    font-style: italic;
                    color: #D97706;
                    line-height: 0.95;
                    letter-spacing: -2px;
                    text-transform: uppercase;
                }
            </style>
        </head>
        <body>
            <div class="logo-container">
                <div class="logo-badge">
                    <div class="logo-badge-text">
                        <span class="small-s">s</span><span>F</span>
                    </div>
                </div>
                <div class="logo-text-col">
                    <div class="text-super">SÚPER</div>
                    <div class="text-fullget">FULLGET</div>
                </div>
            </div>
        </body>
        </html>
        `;

        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        await new Promise(r => setTimeout(r, 600));

        const logoElement = await page.$('.logo-container');
        const outputPathJpg = path.join(__dirname, 'assets', 'img', 'logo-superfullget.jpg');
        const outputPathPng = path.join(__dirname, 'assets', 'img', 'logo-superfullget.png');

        await logoElement.screenshot({ path: outputPathJpg, type: 'jpeg', quality: 98 });
        await logoElement.screenshot({ path: outputPathPng, type: 'png' });

        await browser.close();
        console.log('Regenerated tightly cropped logo-superfullget successfully!');
    } catch (e) {
        console.error(e);
    }
})();
