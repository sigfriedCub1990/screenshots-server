const fs = require('fs-extra');
const nodePath = require('path');
const puppeteer = require('puppeteer');
const rateLimit = require('express-rate-limit');
const Utils = require('../utils/utils.js');

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    max: 10,
    message: "Too many requests from your IP, try again in 5 minutes."
  });

const path = '/api/';

const apiController = {
    registerRoutes: function (app) {
        app.post(`${path}download`, this.download);
        app.post(`${path}screenshot`, limiter, this.screenshot);
    },

    screenshot: async function(req,res) {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setViewport({ width: 1910, height: 1080});

            const name = Utils.generateHash();

            await page.goto(req.body.url, {waitUntil: 'load'});
            await page.screenshot({path: nodePath.join(process.cwd(), `./screenshots/${name}.jpg`), fullPage: true});

            await browser.close();

            await Utils.compressFile(nodePath.join(process.cwd(), `./screenshots/`), name);
            fs.unlink(nodePath.join(process.cwd(), `./screenshots/${name}.jpg`));

            res.json({status: 'Ok', hash: `${name}.gz`});
        } catch (e) {
            res.json({status: 'error', message: e.message});
        }
    },

    download: function(req, res) {
        const file = nodePath.join(process.cwd(), `./screenshots/${req.body.image}`);

        res.download(file);
    }
};

module.exports = apiController;