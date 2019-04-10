# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

# How to mint a new token without verification (Only for testing)
Run the following in the truffle console
`for(let i=1;i<=10;i++){SolnSquareVerifier.deployed().then(e=>e.mint("0x4b2c95D63a707824F896AB14027Ff0085925553D",i,{from:"0x4b2c95D63a707824F896AB14027Ff0085925553D"})).then(e=>{console.log(e)}).catch(e=>{console.log(e)});}`

# Truffle Test
- Run `truffle test` to test the code.

# Rinkeby Contract Address
First the `Verifier` contract is deployed then the `SolnSquareVerifier` contract using the `Verifier` address.
- Verifier - https://rinkeby.etherscan.io/address/0xaD169D65827090661C40aB5dd9Ad86d4FF71D656
- SolnSquareVerifier - https://rinkeby.etherscan.io/address/0x652Ce41eB9e87DB8E60ba26535E412Fc3Bc08D8f

# Contract ABI
All contract API are in the build folder

# OpenSea MarketPlace Storefront
https://rinkeby.opensea.io/assets/manishpropertiesv10

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)