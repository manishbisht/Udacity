const bitcoin = require('bitcoinjs-lib'); // v3.x.x
const bitcoinMessage = require('bitcoinjs-message');
const validation = require('../utils/validation');

exports.requestValidation = function (req, res) {
    let data = req.body;
    if (data.address) {
        let walletAddress = data.address;
        validation.getLevelDBData(walletAddress).then((request) => {
            let oldDate = new Date(parseFloat(request.requestTimeStamp)).getTime();
            let newDate = new Date().getTime();
            let timeDifference = (300 - ((newDate - oldDate) / 1000)).toString();
            if(timeDifference > 0) {
                request.validationWindow = timeDifference;
                validation.addLevelDBData(walletAddress, JSON.stringify(request)).then(() => {
                    res.send(request);
                }).catch((error) => {
                    res.send(error);
                });
            } else {
                request.validationWindow = 300;
                request.requestTimeStamp = new Date().getTime().toString();
                request.message = walletAddress + ":" + request.requestTimeStamp + ":" + "starRegistry";
                validation.addLevelDBData(walletAddress, JSON.stringify(request)).then(() => {
                    res.send(request);
                }).catch((error) => {
                    res.send(error);
                });
            }
        }).catch(() => {
            let request = {};
            request.address = walletAddress;
            request.requestTimeStamp = new Date().getTime().toString();
            request.message = walletAddress + ":" + request.requestTimeStamp + ":" + "starRegistry";
            request.validationWindow = 300;
            validation.addLevelDBData(walletAddress, JSON.stringify(request)).then(() => {
                console.log(JSON.stringify(request));
                res.send(request);
            }).catch((error) => {
                res.send(error);
            });
        });
    } else {
        res.send({"error": "Wallet address is required."});
    }
};

exports.verifySignature = function (req, res) {
    let data = req.body;
    if (data.address && data.signature) {
        let walletAddress = data.address;
        let messageSignature = data.signature;
        validation.getLevelDBData(walletAddress).then((request) => {
            let oldDate = new Date(parseFloat(request.requestTimeStamp)).getTime();
            let newDate = new Date().getTime();
            let timeDifference = (300 - ((newDate - oldDate) / 1000)).toString();
            if(timeDifference > 0) {
                request.validationWindow = timeDifference;
                let message = request.message;
                let isValid = bitcoinMessage.verify(message, walletAddress, messageSignature);
                if(isValid) {
                    let result = {};
                    result.registerStar = isValid;
                    result.status = request;
                    result.status.messageSignature = "valid";
                    res.send(result);
                } else {
                    res.send({"error": "Invalid message Signature"});
                }
            } else {
                res.send({"error": "Time Expired"});
            }
        }).catch(() => {
            res.send({"error": "Request can't be created"});
        });
    } else {
        res.send({"error": "Wallet address and message signature is required."});
    }
};