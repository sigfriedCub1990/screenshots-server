const fs = require('fs-extra');
const nodePath = require('path');
const puppeteer = require('puppeteer');
const Utils = require('../utils/utils.js');

const path = '/api/';

const apiController = {
    registerRoutes: function (app) {
        app.post(`${path}download`, this.download);
        app.post(`${path}screenshot`, this.screenshot);
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

            res.json({status: 'Ok', hash: name});
        } catch (e) {
            res.json({status: 'error', message: e.message});
        }
    },

    download: function(req, res) {
        const file = nodePath.join(process.cwd(), `./screenshots/${req.body.image}.jpg`);
        res.download(file)
    }
};

module.exports = apiController;