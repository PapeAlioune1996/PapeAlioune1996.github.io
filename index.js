const puppeteer = require('puppeteer');
const sharp = require('sharp');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Configurer la vue et capturer la page
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
    await page.goto('http://localhost:5174/');
    await page.screenshot({ path: 'gesteflottesn.png', fullPage: true });
    
    await browser.close();

    // Redimensionner l'image pour en faire une miniature
    sharp('gesteflottesn.png')
        .resize(320, 180) // Taille de la miniature
        .toFile('thumbnail1.png', (err, info) => {
            if (err) {
                console.error('Erreur lors de la création de la miniature', err);
            } else {
                console.log('Miniature créée avec succès :', info);
            }
        });
})();
