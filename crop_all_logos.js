const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
    try {
        console.log('Cropping all product logos to remove excessive whitespace...');
        const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
        const page = await browser.newPage();

        const logos = [
            { file: 'logo-superbrite.jpg', name: 'superbrite' },
            { file: 'logo-superkote.jpg', name: 'superkote' },
            { file: 'logo-spraydeck.jpg', name: 'spraydeck' },
            { file: 'logo-superseal.jpg', name: 'superseal' }
        ];

        for (const item of logos) {
            const filePath = path.join(__dirname, 'assets', 'img', item.file);
            const bitmap = fs.readFileSync(filePath);
            const base64 = `data:image/jpeg;base64,${bitmap.toString('base64')}`;

            const resultBase64 = await page.evaluate(async (imgSrc) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.crossOrigin = 'anonymous';
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        ctx.fillStyle = '#FFFFFF';
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img, 0, 0);

                        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        const { data, width, height } = imgData;

                        let minX = width, minY = height, maxX = 0, maxY = 0;

                        for (let y = 0; y < height; y++) {
                            for (let x = 0; x < width; x++) {
                                const idx = (y * width + x) * 4;
                                const r = data[idx];
                                const g = data[idx + 1];
                                const b = data[idx + 2];
                                const a = data[idx + 3];

                                // Non-white pixel threshold
                                if (a > 20 && (r < 245 || g < 245 || b < 245)) {
                                    if (x < minX) minX = x;
                                    if (x > maxX) maxX = x;
                                    if (y < minY) minY = y;
                                    if (y > maxY) maxY = y;
                                }
                            }
                        }

                        // Add small padding around the logo
                        const padX = Math.round(width * 0.02);
                        const padY = Math.round(height * 0.02);

                        minX = Math.max(0, minX - padX);
                        minY = Math.max(0, minY - padY);
                        maxX = Math.min(width, maxX + padX);
                        maxY = Math.min(height, maxY + padY);

                        const cropW = maxX - minX;
                        const cropH = maxY - minY;

                        const cropCanvas = document.createElement('canvas');
                        cropCanvas.width = cropW;
                        cropCanvas.height = cropH;
                        const cropCtx = cropCanvas.getContext('2d');
                        cropCtx.fillStyle = '#FFFFFF';
                        cropCtx.fillRect(0, 0, cropW, cropH);
                        cropCtx.drawImage(canvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);

                        resolve(cropCanvas.toDataURL('image/jpeg', 0.98));
                    };
                    img.src = imgSrc;
                });
            }, base64);

            const base64Data = resultBase64.replace(/^data:image\/jpeg;base64,/, '');
            fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
            console.log(`Successfully cropped and saved ${item.file}`);
        }

        await browser.close();
        console.log('All product logos trimmed and optimized!');
    } catch (e) {
        console.error('Error cropping logos:', e);
    }
})();
