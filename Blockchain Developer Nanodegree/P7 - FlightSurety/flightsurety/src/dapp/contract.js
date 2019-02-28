import FlightSuretyApp from '../../build/contracts/FlightSuretyApp.json';
import FlightSuretyData from '../../build/contracts/FlightSuretyData.json';
import Config from './config.json';
import Web3 from 'web3';

export default class Contract {
    constructor(network, callback) {

        let config = Config[network];
        this.web3 = new Web3(new Web3.providers.WebsocketProvider(config.url));
        this.flightSuretyApp = new this.web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);
        this.flightSuretyData = new this.web3.eth.Contract(FlightSuretyData.abi, config.dataAddress);
        this.initialize(callback);
        this.owner = null;
        this.airlines = [];
        this.passengers = [];
        this.flights = [];
    }

    initialize(callback) {
        this.web3.eth.getAccounts((error, accts) => {

            this.owner = accts[0];

            let counter = 1;

            while (this.airlines.length < 5) {
                this.airlines.push(accts[counter++]);
            }

            while (this.passengers.length < 5) {
                this.passengers.push(accts[counter++]);
            }

            callback();
        });
    }

    isOperational(callback) {
        let self = this;
        self.flightSuretyApp.methods
            .isOperational()
            .call({from: self.owner}, callback);
    }

    fetchFlightStatus(flight, callback) {
        let self = this;
        let payload = {
            airline: self.airlines[0],
            flight: flight,
            timestamp: Math.floor(Date.now() / 1000)
        };
        self.flightSuretyApp.methods
            .fetchFlightStatus(payload.airline, payload.flight, payload.timestamp)
            .send({from: self.owner}, (error, result) => {
                self.flights.push(payload);
                callback(error, payload);
            });
    }

    buyInsurance(flight, insuranceAmount, callback) {
        let self = this;
        self.flightSuretyApp.methods.buyInsurance(flight.airline, flight.flight, flight.timestamp, self.passengers[0]).send({
            from: self.passengers[0],
            value: self.web3.utils.toWei(insuranceAmount, "ether"),
            gas: 4712388,
            gasPrice: 100000000000
        }, (error, result) => {
            flight.insuranceAmount = insuranceAmount;
            flight.passenger = self.passengers[0];
            callback(error, flight);
        });
    }

    withdrawAmount(walletAddress, callback) {
        let self = this;
        self.flightSuretyApp.methods.withdrawAmount().send({
            from: walletAddress,
        }, (error, result) => {
            callback(error, result);
        });
    }
}