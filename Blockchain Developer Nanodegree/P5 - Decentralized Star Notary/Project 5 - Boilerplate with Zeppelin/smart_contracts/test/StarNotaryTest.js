const StarNotary = artifacts.require('StarNotary');
const Star = require('./Star');

contract('Decentralized Star Notary', async accounts => {
    let defaultAccount = accounts[0];
    let seller = accounts[1];
    let buyer = accounts[2];
    let operator = accounts[3];
    let starTokenOne = 1;
    let starTokenTwo = 2;
    let starTokenThatDoesNotExist = 99;
    let starOne = new Star("Star 1", "This is star 1", "032.155", "121.874", "245.978");
    let starTwo = new Star("Star 2", "This is star 2", "132.155", "121.874", "245.978");
    let starTokenOnePrice = web3.toWei(0.01, "ether");

    beforeEach(async function () {
        this.contract = await StarNotary.new("Star Notary", "SNT", {from: defaultAccount});
    });

    describe('Create a new star', async function () {
        let newStar;

        beforeEach(async function () {
            await this.contract.createStar(starOne.name, starOne.story, starOne.rightAscend, starOne.declination, starOne.magnitude, starTokenOne, {from: seller});

            newStar = await this.contract.tokenIdToStarInfo(starTokenOne);
        });

        it('The true is returned, when the star one exists', async function () {
            let exists = await this.contract.checkIfStarExists(starOne.rightAscend, starOne.declination, starOne.magnitude);
            assert.equal(exists, true);
        });

        it('The false is returned, when the star two does not exist', async function () {
            let exists = await this.contract.checkIfStarExists(starTwo.rightAscend, starTwo.declination, starTwo.magnitude);

            assert.equal(exists, false);
        });

        it('The star name matches input', async function () {
            assert.equal(newStar[0], starOne.name);
        });

        it('The star story matches input', async function () {
            assert.equal(newStar[1], starOne.story);
        });

        it('The star right ascend matches "ra_" + input', async function () {
            assert.equal(newStar[2], `ra_${starOne.rightAscend}`);
        });

        it('The star declination matches "dec_" + input', async function () {
            assert.equal(newStar[3], `dec_${starOne.declination}`);
        });

        it('The star magnitude matches "mag_" + input', async function () {
            assert.equal(newStar[4], `mag_${starOne.magnitude}`);
        });

        it('Create another star, when one coordinate is different', async function () {
            await this.contract.createStar(starTwo.name, starTwo.story, starTwo.rightAscend, starTwo.declination, starOne.magnitude, starTokenTwo, {from: seller});
            let anotherStar = await this.contract.tokenIdToStarInfo(starTokenTwo);
            assert.equal(anotherStar[0], starTwo.name);
        });
    });

    describe('Put Star for Sale', async function () {
        let putStarForSaleTransaction;
        before(async function () {
            putStarForSaleTransaction = await this.contract.putStarUpForSale(starTokenOne, starTokenOnePrice, {from: seller});
        });

        it('Put Star Token For Sale Transaction', async function () {
            assert.equal(putStarForSaleTransaction.receipt.status, "0x01");
        });
    });

    describe("Buy Star From Sale", async function () {

        beforeEach(async function () {
            await this.contract.createStar(starOne.name, starOne.story, starOne.rightAscend, starOne.declination, starOne.magnitude, starTokenOne, {from: seller});
            await this.contract.putStarUpForSale(starTokenOne, starTokenOnePrice, {from: seller});
        });

        describe("Buyer buys at token price", async function () {
            let buyStarTransaction;
            let sellerBalanceBefore;
            let sellerBalanceAfter;
            let buyerBalanceBefore;
            let buyerBalanceAfter;
            let currentTokenOwner;
            beforeEach(async function () {
                sellerBalanceBefore = web3.eth.getBalance(seller);
                buyerBalanceBefore = web3.eth.getBalance(buyer);
                buyStarTransaction = await this.contract.buyStar(starTokenOne, {
                    from: buyer,
                    value: starTokenOnePrice,
                    gasPrice: 0
                });
                sellerBalanceAfter = web3.eth.getBalance(seller);
                buyerBalanceAfter = web3.eth.getBalance(buyer);
                currentTokenOwner = await this.contract.ownerOf(starTokenOne);
            });
            it('Buy Star Token Transaction successful', async function () {
                assert.equal(buyStarTransaction.receipt.status, "0x01");
            });
            it('Seller balance increased by star price', async function () {
                assert.equal(sellerBalanceAfter.sub(sellerBalanceBefore), starTokenOnePrice);
            });
            it('Buyer balance decreased by star price', async function () {
                assert.equal(buyerBalanceBefore.sub(buyerBalanceAfter), starTokenOnePrice);
            });
            it('Buyer owns the star token', async function () {
                assert.equal(currentTokenOwner, buyer);
            });
        });
    });
});