const SHA256 = require('crypto-js/sha256');
const blockchain = require('../utils/blockchain');

class Block {
    constructor(data) {
        this.hash = "";
        this.height = 0;
        this.body = data;
        this.time = new Date().getTime().toString();
        this.previousBlockHash = "";
    }
}

exports.createBlock = function (req, res) {
    let data = req.body;
    if (data.address && data.star) {
        let star = data.star;
        if (star.dec && star.ra) {
            if (star.story.split(' ').length <= 250) {
                let block = new Block(data);
                blockchain.getBlockHeight().then((height) => {
                    if (height === 0) {
                        let firstBlock = new Block("First block in the chain - Genesis block");
                        firstBlock.hash = SHA256(JSON.stringify(firstBlock)).toString();
                        blockchain.addDataToLevelDB(JSON.stringify(firstBlock)).then(() => {
                            block.previousBlockHash = firstBlock.hash;
                            block.height = height + 1;
                            block.hash = SHA256(JSON.stringify(block)).toString();
                            blockchain.addDataToLevelDB(JSON.stringify(block)).then(() => {
                                res.send(block);
                            }).catch((error) => {
                                res.send(error);
                            });
                        }).catch((error) => {
                            res.send(error);
                        });
                    } else {
                        blockchain.getBlock(height - 1).then((prevBlock) => {
                            block.previousBlockHash = prevBlock.hash;
                            block.height = height;
                            block.hash = SHA256(JSON.stringify(block)).toString();
                            blockchain.addDataToLevelDB(JSON.stringify(block)).then(() => {
                                res.send(block);
                            }).catch((error) => {
                                res.send(error);
                            });
                        }).catch((error) => {
                            res.send(error);
                        });
                    }
                }).catch((error) => {
                    res.send(error);
                });
            } else {
                res.send({"error": "star_story data for star is limited to 250 words"});
            }
        } else {
            res.send({"error": "right_ascension and declination data for star is required."});
        }
    } else {
        res.send({"error": "Wallet address and star data is required."});
    }
};

exports.blockDetailsByAddress = function (req, res) {
    let walletAddress = req.params.walletAddress;
    blockchain.getBlocksByAddress(walletAddress).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.send({"error": error});
    });
};

exports.blockDetailsByBlockHash = function (req, res) {
    let blockHash = req.params.blockHash;
    blockchain.getBlockByHash(blockHash).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.send({"error": error});
    });
};

exports.blockDetails = function (req, res) {
    let blockId = req.params.blockId;
    blockchain.getBlock(blockId).then((block) => {
        res.send(block);
    }).catch((error) => {
        res.send(error);
    });
};