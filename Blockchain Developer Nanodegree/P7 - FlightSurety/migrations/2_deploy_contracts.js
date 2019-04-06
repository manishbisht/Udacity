const FlightSuretyApp = artifacts.require("FlightSuretyApp");
const FlightSuretyData = artifacts.require("FlightSuretyData");
const fs = require('fs');

module.exports = function (deployer) {

    let owner = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57';
    let firstAirline = '0xf17f52151EbEF6C7334FAD080c5704D77216b732';
    deployer.deploy(FlightSuretyData, {from: firstAirline}).then(() => {
        return deployer.deploy(FlightSuretyApp, FlightSuretyData.address, {from: owner}).then(() => {
            let config = {
                localhost: {
                    url: 'ws://localhost:7545',
                    dataAddress: FlightSuretyData.address,
                    appAddress: FlightSuretyApp.address
                }
            };
            fs.writeFileSync(__dirname + '/../src/dapp/config.json', JSON.stringify(config, null, '\t'), 'utf-8');
            fs.writeFileSync(__dirname + '/../src/server/config.json', JSON.stringify(config, null, '\t'), 'utf-8');
        });
    });
};