var ERC721Mintable = artifacts.require('ERC721Mintable');

contract('TestERC721Mintable', accounts => {
    let propertyName = "Manish First Property";
    let propertySymbol = "Manish Nivas";
    let propertyBaseURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await ERC721Mintable.new(propertyName, propertySymbol, propertyBaseURI, {from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_one, 1);
            await this.contract.mint(account_one, 2);
            await this.contract.mint(account_one, 3);
            await this.contract.mint(account_one, 4);
            await this.contract.mint(account_one, 5);
            await this.contract.mint(account_one, 6);
            await this.contract.mint(account_one, 7);
            await this.contract.mint(account_one, 8);
            await this.contract.mint(account_one, 9);
            await this.contract.mint(account_one, 10);
        });

        it('should return total supply', async function () {
            let totalSupply = await this.contract.totalSupply.call();
            assert.equal(totalSupply, 10, "Incorrect total supply count");
        });

        it('should get token balance', async function () {
            let tokenBalance = await this.contract.balanceOf.call(account_one);
            assert.equal(tokenBalance, 10, "Incorrect token balance count");
        });

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            let tokenURI = await this.contract.tokenURI.call(1);
            assert.equal(tokenURI, propertyBaseURI + 1, "Incorrect token url");
        });

        it('should transfer token from one owner to another', async function () {
            await this.contract.transferFrom(account_one, account_two, 10);
            let newOwner = await this.contract.ownerOf.call(10);
            assert.equal(newOwner, account_two, "Token is not transferred successfully");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await ERC721Mintable.new(propertyName, propertySymbol, propertyBaseURI, {from: account_one});
        });

        it('should fail when minting when address is not contract owner', async function () {
            let isFailed = false;
            try {
                await this.contract.mint(account_two, 11, {from: account_two});
            } catch {
                isFailed = true;
            }
            assert.equal(isFailed, true, "minting doesn't failed when address is not the contract owner");
        });

        it('should return contract owner', async function () {
            let currentOwner = await this.contract.currentOwner.call();
            assert.equal(currentOwner, account_one, "Incorrect owner address");
        });

    });
});