/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/

const SHA256 = require('crypto-js/sha256');
const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);

// Add data to levelDB with key/value pair
function addLevelDBData(key, data) {
    db.put(key, data, function (error) {
        if (error) return console.log('Block ' + key + ' submission failed', error);
    })
}

// Get data from levelDB with key
function getLevelDBData(key) {
    return new Promise(function (resolve, reject) {
        db.get(key, function (error, response) {
            if (error) {
                reject('Not found!', error);
            } else {
                resolve(JSON.parse(response));
            }
        });
    });
}

// Add data to levelDB with value
function addDataToLevelDB(data) {
    let i = 0;
    db.createReadStream().on('data', function (data) {
        i++;
    }).on('error', function (error) {
        return console.log('Unable to read data stream!', error)
    }).on('close', function () {
        console.log('Block #' + i + ": " + data);
        addLevelDBData(i, data);
    });
}

/* ===== Block Class ==============================
|  Class with a constructor for block 			   |
|  ===============================================*/

class Block {
    constructor(data) {
        this.hash = "";
        this.height = 0;
        this.body = data;
        this.time = 0;
        this.previousBlockHash = "";
    }
}

/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

class Blockchain {
    constructor() {
        let self = this;
        this.getBlockHeight()
            .then(function (height) {
                if (height === 0) {
                    self.addBlock(new Block("First block in the chain - Genesis block"));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Add new block
    addBlock(newBlock) {
        let self = this;
        this.getBlockHeight()
            .then(function (height) {
                // Block height
                newBlock.height = height;
                // UTC timestamp
                newBlock.time = new Date().getTime().toString().slice(0, -3);
                if (height > 0) {
                    self.getBlock(height - 1)
                        .then(function (block) {
                            // previous block hash
                            newBlock.previousBlockHash = block.hash;
                            // Block hash with SHA256 using newBlock and converting to a string
                            newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
                            // Adding block object to chain
                            addDataToLevelDB(JSON.stringify(newBlock));
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    // Block hash with SHA256 using newBlock and converting to a string
                    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
                    // Adding block object to chain
                    addDataToLevelDB(JSON.stringify(newBlock));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Get block height
    getBlockHeight() {
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
    }

    // get block
    getBlock(blockHeight) {
        return new Promise(function (resolve, reject) {
            db.get(blockHeight, function (err, value) {
                if (err) {
                    reject('Not found!', err);
                } else {
                    resolve(JSON.parse(value));
                }
            });
        });
    }

    // validate block
    validateBlock(block) {
        // get block hash
        let blockHash = block.hash;
        // remove block hash to test block integrity
        block.hash = '';
        // generate block hash
        let validBlockHash = SHA256(JSON.stringify(block)).toString();
        // Compare
        if (blockHash === validBlockHash) {
            return true;
        } else {
            console.log('Block #' + block.height + ' invalid hash:\n' + blockHash + '<>' + validBlockHash);
            return false;
        }
    }

    // Validate blockchain
    validateChain() {
        let errorLog = [];
        let self = this;
        this.getBlockHeight()
            .then(function (height) {
                for (let i = 0; i < height - 1; i++) {
                    self.getBlock(i)
                        .then(function (block) {
                            // validate block
                            let blockHash = block.hash;
                            if (!self.validateBlock(block)) errorLog.push(i);
                            self.getBlock(i + 1)
                                .then(function (nextBlock) {
                                    let previousHash = nextBlock.previousBlockHash;
                                    // compare blocks hash link
                                    if (blockHash !== previousHash) {
                                        errorLog.push(i);
                                    }
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        if (errorLog.length > 0) {
            console.log('Block errors = ' + errorLog.length);
            console.log('Blocks: ' + errorLog);
        } else {
            console.log('No errors detected');
        }
    }
}