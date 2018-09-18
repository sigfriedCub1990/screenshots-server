const crypto = require('crypto');
const compressing = require('compressing');
const path = require('path');

exports.generateHash = function () {
    const hash = crypto.createHash('sha256');
    const name = crypto.randomBytes(10).toString('hex');
    hash.update(name);
    return hash.digest('hex');
};

exports.compressFile = function (filePath, name) {
    return compressing.gzip.compressFile(`${filePath}${name}.jpg`, `${filePath}${name}.gz`);
}