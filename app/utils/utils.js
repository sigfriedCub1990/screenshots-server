const crypto = require('crypto');

exports.generateHash = function () {
    const hash = crypto.createHash('sha256');
    const name = crypto.randomBytes(10).toString('hex');
    hash.update(name);
    return hash.digest('hex');
};