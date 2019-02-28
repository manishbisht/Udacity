const HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic = "exotic dose tag outer brand nest february walk gap harbor crane local";

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*", // Match any network id,
        },
        rinkeby: {
            provider: () => new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/4c3ad808210845cc9b68a8957dc362e2'),
            network_id: 4,
            gas: 4500000,
            gasPrice: 10000000000
        },
    }
};