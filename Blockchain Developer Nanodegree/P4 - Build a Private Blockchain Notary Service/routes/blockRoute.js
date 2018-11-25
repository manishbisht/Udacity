module.exports = function (app) {
    let blockController = require('../controller/blockController');

    app.route('/block')
        .post(blockController.createBlock);

    app.route('/block/:blockId')
        .get(blockController.blockDetails);

    app.route('/stars/address::walletAddress')
        .get(blockController.blockDetailsByAddress);

    app.route('/stars/hash::blockHash')
        .get(blockController.blockDetailsByBlockHash);
};