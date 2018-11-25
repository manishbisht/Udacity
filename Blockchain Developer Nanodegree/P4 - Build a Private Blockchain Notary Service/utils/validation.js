const level = require('level');
const chainDB = './validation';
const db = level(chainDB);

// Add data to levelDB with key/value pair
exports.addLevelDBData = function (key, data) {
    return new Promise(function (resolve, reject) {
        db.put(key, data, function (error) {
            if (error) {
                reject('Block ' + key + ' submission failed', error);
            } else {
                resolve(data);
            }
        });
    });
};

// Get data from levelDB with key
exports.getLevelDBData = function (key) {
    return new Promise(function (resolve, reject) {
        db.get(key, function (error, response) {
            if (error) {
                reject('Not found!', error);
            } else {
                resolve(JSON.parse(response));
            }
        });
    });
};