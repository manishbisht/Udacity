const Verifier = artifacts.require('Verifier');
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const proof = require('../../zokrates/code/square/proof.json');

contract('SolnSquareVerifier', accounts => {
    const account_one = accounts[0];
    const A = proof["proof"]["A"];
    const A_p = proof["proof"]["A_p"];
    const B = proof["proof"]["B"];
    const B_p = proof["proof"]["B_p"];
    const C = proof["proof"]["C"];
    const C_p = proof["proof"]["C_p"];
    const H = proof["proof"]["H"];
    const K = proof["proof"]["K"];
    const correctProofInput = proof["input"];
    let propertyName = "Manish First Property";
    let propertySymbol = "Manish Nivas";
    let propertyBaseURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

    describe('match SolnSquareVerifier spec', function () {
        beforeEach(async function () {
            this.VerifierContract = await Verifier.new({from: account_one});
            this.SolnSquareVerifierContract = await SolnSquareVerifier.new(this.VerifierContract.address, propertyName, propertySymbol, propertyBaseURI, {from: account_one});
        });

        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('Test if a new solution can be added for contract', async function () {
            let isNewSolutionAdded = await this.SolnSquareVerifierContract.addSolution.call(A, A_p, B, B_p, C, C_p, H, K, correctProofInput, account_one);
            assert.equal(isNewSolutionAdded, true, "Unable to add new solution");
        });

        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('Test if an ERC721 token can be minted for contract', async function () {
            let isNewTokenMinted = await this.SolnSquareVerifierContract.mintNewToken.call(A, A_p, B, B_p, C, C_p, H, K, correctProofInput, account_one, 1);
            assert.equal(isNewTokenMinted, true, "Unable to mint a new token");
        });

    });
});