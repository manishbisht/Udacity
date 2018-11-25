const level = require('level');
const chainDB = '../chaindata';
const db = level(chainDB);

// Add data to levelDB with key/value pair
addLevelDBData = function (key, data) {
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

// Add data to levelDB with value
exports.addDataToLevelDB = function (data) {
    return new Promise(function (resolve, reject) {
        let height = 0;
        db.createReadStream()
            .on('data', function () {
                height++;
            })
            .on('error', function (error) {
                reject('Unable to read data stream!', error);
            })
            .on('close', function () {
                addLevelDBData(height, data).then(() => {
                    resolve(JSON.parse(data))
                }).catch((error) => {
                    reject('Block ' + key + ' submission failed', error);
                });
            });
    });
};

// Get the height of the block
exports.getBlockHeight = function () {
    return new Promise(function (resolve, reject) {
        let height = 0;
        db.createReadStream()
            .on('data', function () {
                height++;
            })
            .on('error', function (error) {
                reject('Unable to read data stream!', error);
            })
            .on('close', function () {
                resolve(height);
            });
    });
};

// Get the block data
exports.getBlock = function (blockHeight) {
    return new Promise(function (resolve, reject) {
        db.get(blockHeight, function (err, value) {
            if (err) {
                reject('Not found!', err);
            } else {
                resolve(JSON.parse(value));
            }
        });
    });
};