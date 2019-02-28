// migrating the appropriate contracts
var ManufacturerRole = artifacts.require("./ManufacturerRole.sol");
var RetailerRole = artifacts.require("./RetailerRole.sol");
var CustomerRole = artifacts.require("./CustomerRole.sol");
var SupplyChain = artifacts.require("./SupplyChain.sol");

module.exports = function(deployer) {
  deployer.deploy(ManufacturerRole);
  deployer.deploy(RetailerRole);
  deployer.deploy(CustomerRole);
  deployer.deploy(SupplyChain);
};
