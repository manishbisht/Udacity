var Test = require('../config/testConfig.js');
var BigNumber = require('bignumber.js');

contract('Flight Surety Tests', async (accounts) => {

    var config;
    before('setup contract', async () => {
        config = await Test.Config(accounts);
        // await config.flightSuretyData.authorizeCaller(config.flightSuretyApp.address);
    });

    /****************************************************************************************/
    /* Operations and Settings                                                              */
    /****************************************************************************************/

    it(`(multiparty) has correct initial isOperational() value`, async function () {

        // Get operating status
        let status = await config.flightSuretyApp.isOperational.call();
        assert.equal(status, true, "Incorrect initial operating status value");

    });

    it(`(multiparty) can block access to setOperatingStatus() for non-Contract Owner account`, async function () {

        // Ensure that access is denied for non-Contract Owner account
        let accessDenied = false;
        try {
            await config.flightSuretyData.setOperatingStatus(false, {from: config.testAddresses[2]});
        } catch (e) {
            accessDenied = true;
        }
        assert.equal(accessDenied, true, "Access not restricted to Contract Owner");

    });

    it(`(multiparty) can allow access to setOperatingStatus() for Contract Owner account`, async function () {

        // Ensure that access is allowed for Contract Owner account
        let accessDenied = false;
        try {
            await config.flightSuretyData.setOperatingStatus(false, {from: config.firstAirline});
        } catch (e) {
            accessDenied = true;
        }
        assert.equal(accessDenied, false, "Access not restricted to Contract Owner");

        // Set it back for other tests to work
        await config.flightSuretyData.setOperatingStatus(true, {from: config.firstAirline});

    });

    it(`(multiparty) can block access to functions using requireIsOperational when operating status is false`, async function () {

        await config.flightSuretyData.setOperatingStatus(false, {from: config.firstAirline});

        let reverted = false;
        try {
            await config.flightSuretyApp.activateAirline();
        } catch (e) {
            reverted = true;
        }
        assert.equal(reverted, true, "Access not blocked for requireIsOperational");

        // Set it back for other tests to work
        await config.flightSuretyData.setOperatingStatus(true, {from: config.firstAirline});

    });

    it('(airline) can fund first airline', async () => {
        let result1 = await config.flightSuretyApp.isAirlineActivated.call(config.firstAirline);

        assert.equal(result1, false, "Airline is not activated before funding");

        await config.flightSuretyApp.activateAirline.sendTransaction(config.firstAirline, {
            from: config.firstAirline,
            value: config.weiMultiple * 10
        });

        let result2 = await config.flightSuretyApp.isAirlineActivated.call(config.firstAirline);

        assert.equal(result2, true, "Airline should be able to activate if it has provided funding");
    });

    it('(airline) can register 3 new airlines', async () => {
        let result1 = await config.flightSuretyApp.isAirlineRegistered.call(config.testAddresses[1]);
        assert.equal(result1, false, "Unable to register Airline 1");

        let result2 = await config.flightSuretyApp.isAirlineRegistered.call(config.testAddresses[2]);
        assert.equal(result2, false, "Unable to register Airline 2");

        let result3 = await config.flightSuretyApp.isAirlineRegistered.call(config.testAddresses[3]);
        assert.equal(result3, false, "Unable to register Airline 3");

        await config.flightSuretyApp.registerAirline(config.testAddresses[1], {from: config.firstAirline});
        await config.flightSuretyApp.registerAirline(config.testAddresses[2], {from: config.firstAirline});
        await config.flightSuretyApp.registerAirline(config.testAddresses[3], {from: config.firstAirline});

        let result4 = await config.flightSuretyApp.isAirlineRegistered.call(config.testAddresses[1]);
        assert.equal(result4, true, "Unable to register Airline 1");

        let result5 = await config.flightSuretyApp.isAirlineRegistered.call(config.testAddresses[2]);
        assert.equal(result5, true, "Unable to register Airline 2");

        let result6 = await config.flightSuretyApp.isAirlineRegistered.call(config.testAddresses[3]);
        assert.equal(result6, true, "Unable to register Airline 3");

    });

    it('(airline) can fund the 3 new airlines', async () => {
        let result1 = await config.flightSuretyApp.isAirlineActivated.call(config.testAddresses[1]);
        assert.equal(result1, false, "Unable to fund Airline 1");

        let result2 = await config.flightSuretyApp.isAirlineActivated.call(config.testAddresses[2]);
        assert.equal(result2, false, "Unable to fund Airline 2");

        let result3 = await config.flightSuretyApp.isAirlineActivated.call(config.testAddresses[3]);
        assert.equal(result3, false, "Unable to fund Airline 3");

        await config.flightSuretyApp.activateAirline(config.testAddresses[1], {
            from: config.firstAirline,
            value: config.weiMultiple * 10
        });
        await config.flightSuretyApp.activateAirline(config.testAddresses[2], {
            from: config.firstAirline,
            value: config.weiMultiple * 10
        });
        await config.flightSuretyApp.activateAirline(config.testAddresses[3], {
            from: config.firstAirline,
            value: config.weiMultiple * 10
        });

        let result4 = await config.flightSuretyApp.isAirlineActivated.call(config.testAddresses[1]);
        assert.equal(result4, true, "Unable to fund Airline 1");

        let result5 = await config.flightSuretyApp.isAirlineActivated.call(config.testAddresses[2]);
        assert.equal(result5, true, "Unable to fund Airline 2");

        let result6 = await config.flightSuretyApp.isAirlineActivated.call(config.testAddresses[3]);
        assert.equal(result6, true, "Unable to fund Airline 3");
    });

    it('(airline) can register fourth new airline that requires multi-party consensus of 50% of registered airlines', async () => {
        let result1 = await config.flightSuretyApp.isAirlineRegistered.call(config.testAddresses[4]);
        assert.equal(result1, false, "Unable to register Airline");

        await config.flightSuretyApp.registerAirline(config.testAddresses[4], {from: config.firstAirline});
        await config.flightSuretyApp.registerAirline(config.testAddresses[4], {from: config.testAddresses[1]});

        let result2 = await config.flightSuretyApp.isAirlineRegistered.call(config.testAddresses[4]);
        assert.equal(result2, true, "Unable to register Airline");

    });

    it('(airline) can fund fourth new airline', async () => {
        let result1 = await config.flightSuretyApp.isAirlineActivated.call(config.testAddresses[4]);
        assert.equal(result1, false, "Unable to fund Airline");

        await config.flightSuretyApp.activateAirline(config.testAddresses[4], {
            from: config.firstAirline,
            value: config.weiMultiple * 10
        });

        let result4 = await config.flightSuretyApp.isAirlineActivated.call(config.testAddresses[4]);
        assert.equal(result4, true, "Unable to fund Airline");
    });

    it(`(passenger) can buy insurance for a flight`, async function () {
        let flightName = "Bangalore to Jaipur";
        let timestamp = Math.floor(Date.now() / 1000);

        let isInsurancePurchased = true;

        try {
            await config.flightSuretyApp.buyInsurance(config.firstAirline, flightName, timestamp, config.testAddresses[5], {
                from: config.firstAirline,
                value: config.weiMultiple
            });
        } catch (e) {
            isInsurancePurchased = false;
        }

        assert.equal(isInsurancePurchased, true, "Unable to purchase insurance");

    });
});
