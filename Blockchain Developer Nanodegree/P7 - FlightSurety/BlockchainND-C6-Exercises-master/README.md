## Blockchain Course 6 Exercises

To install, download or clone the repo, then:

`npm install`
`truffle compile`

## Develop

To run truffle tests:

`truffle test ./test/ExerciseC6A.js` or `npm test`

## Resources

* [How does Ethereum work anyway?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369)
* [Truffle Framework](http://truffleframework.com/)
* [Ganache Local Blockchain](http://truffleframework.com/ganache/)
* [Solidity Language Reference](http://solidity.readthedocs.io/en/v0.4.24/)
* [Ethereum Blockchain Explorer](https://etherscan.io/)
* [Web3Js Reference](https://github.com/ethereum/wiki/wiki/JavaScript-API)* [BIP39 Mnemonic Generator](https://iancoleman.io/bip39/)
* [Remix Solidity IDE](https://remix.ethereum.org/)

## Versions

This code was created with the following versions of tools:

* Truffle v5.0.1 (core: 5.0.1)
* Solidity v0.5.0 (solc-js)
* Node v8.9.4
* Ganache v1.2.3

## Troubleshooting

* Ensure Ganache is running on port 8545
* Ensure Ganache mnemonic is identical to mnemonic in truffle.js
* Ensure you have at least the versions of the tools specified above
* Delete node_modules folder and run "npm install" to refresh dependencies
* If you get compiler errors, change the "pragma" line in all .sol files to match your version
