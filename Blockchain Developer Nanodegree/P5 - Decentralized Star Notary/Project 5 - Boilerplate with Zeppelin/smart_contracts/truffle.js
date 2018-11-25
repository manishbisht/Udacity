/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "worry segment duck entire beyond myth flavor region over foam display meat";
const infuraEndpoint = "https://rinkeby.infura.io/v3/6f8b6a0e63e3431e9c2218ea634834d6";

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!

    networks: {
        development: {
            host: '127.0.0.1',
            port: 8545,
            network_id: "*",
            gas: 6721975,
        },
        rinkeby: {
            host: "localhost",
            provider: () => new HDWalletProvider(mnemonic, infuraEndpoint),
            network_id: 4,
            gas: 6721975,
            gasPrice: 20000000000,
        },
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};
