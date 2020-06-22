const fs = require('fs');
const path = require('path');
const https = require('https');

const bent = require('bent');
const slice = require('./slice');

const getJSON = bent('json');
const getBuffer = bent('buffer');

function generate(outputDir) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

        let sheetPath = path.join(outputDir, 'sheet.png');

        Promise.all([
            getJSON('https://raw.githubusercontent.com/RobloxAPI/build-archive/master/data/production/latest.json'),
            getJSON('https://reflection.rbx-api.xyz/icons')
        ]).then(response => {
            let version = response[0].GUID;
            let index = response[1];

            const sheetPath = path.join(outputDir, 'sheet.png');

            getBuffer(`https://raw.githubusercontent.com/RobloxAPI/build-archive/master/data/production/builds/${version}/ClassImages.png`).then(buffer => {
                fs.writeFileSync(sheetPath, buffer);

                slice(sheetPath, outputDir, 16, 16).then(() => {
                    let paths = {};

                    for (let className in index) {
                        paths[className] = path.join(outputDir, index[className] + '.png');
                    }

                    resolve(paths);
                })
            })
        })
    })
}

module.exports = {
    generate
}