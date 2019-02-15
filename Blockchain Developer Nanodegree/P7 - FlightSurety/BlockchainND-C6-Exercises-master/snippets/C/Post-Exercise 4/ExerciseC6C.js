
var Test = require('../config/testConfig.js');

contract('ExerciseC6C', async (accounts) => {

  var config;
  before('setup contract', async () => {
    config = await Test.Config(accounts);
  });

  it('can register Employee, add sale and calculate bonus', async () => {
    
    // ARRANGE
    let employee = {
      id: 'test1',
      isAdmin: false,
      address: config.testAddresses[0]
    };
    let sale = 400;
    let expectedBonus = parseInt(sale * 0.07);

    // ACT
    await config.exerciseC6C.registerEmployee(employee.id, employee.isAdmin, employee.address);
    await config.exerciseC6CApp.addSale(employee.id, 400);
    let bonus = await config.exerciseC6C.getEmployeeBonus.call(employee.id);

    // ASSERT
    assert.equal(bonus.toNumber(), expectedBonus, "Calculated bonus is incorrect incorrect");

  });


 
});
