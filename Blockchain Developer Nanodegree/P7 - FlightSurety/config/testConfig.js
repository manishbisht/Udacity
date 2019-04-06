
var FlightSuretyApp = artifacts.require("FlightSuretyApp");
var FlightSuretyData = artifacts.require("FlightSuretyData");
var BigNumber = require('bignumber.js');

var Config = async function(accounts) {
    
    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        "0xf17f52151EbEF6C7334FAD080c5704D77216b732",
        "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef",
        "0x821aEa9a577a9b44299B9c15c88cf3087F3b5544",
        "0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2",
        "0x2932b7A2355D6fecc4b5c0B6BD44cC31df247a2e",
        "0x2191eF87E392377ec08E7c08Eb105Ef5448eCED5",
        "0x0F4F2Ac550A1b4e2280d04c21cEa7EBD822934b5",
        "0x6330A553Fc93768F612722BB8c2eC78aC90B3bbc",
        "0x5AEDA56215b167893e80B4fE645BA6d5Bab767DE"
    ];


    let owner = accounts[0];
    let firstAirline = accounts[1];

    let flightSuretyData = await FlightSuretyData.new({from: firstAirline});
    let flightSuretyApp = await FlightSuretyApp.new(flightSuretyData.address);

    return {
        owner: owner,
        firstAirline: firstAirline,
        weiMultiple: (new BigNumber(10)).pow(18),
        testAddresses: testAddresses,
        flightSuretyData: flightSuretyData,
        flightSuretyApp: flightSuretyApp
    }
};

module.exports = {
    Config: Config
};