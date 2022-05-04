const express = require('express');
const puppeteer = require('puppeteer');

const server = express();


server.get('/', async (request, response) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('siteURL');
    //Pegar dados da pagina

    // Get the "viewport" of the page, as reported by the page.
    const PageContent = await page.evaluate(() => {
        let unParsedData = document.getElementsByClassName('sc-cnTVOG').childNodes;

        return unParsedData
        // return {
        //     ofertasDoDiaMagalu: unParsedData != undefined ? JSON.parse(unParsedData) : {"Error: ": "Cant Catch Data From Website!"},
        // };
    });

    console.log('PageContent: ', PageContent.unParsedData);

    await browser.close(); 
    //

    response.send({
        "OfertasDoDiaMagalu": PageContent.unParsedData
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`
        server UP!
        Ruring on http://localhost:${port}
    `);
});


// =============================

// ;(async () => {
// })();