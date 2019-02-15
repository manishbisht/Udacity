
var Test = require('../config/testConfig.js');

contract('ExerciseC6A', async (accounts) => {

  var config;
  before('setup contract', async () => {
    config = await Test.Config(accounts);
  });

  it('contract owner can register new user', async () => {
    
    // ARRANGE
    let caller = config.owner;
    let newUser = config.testAddresses[0]; 

    // ACT
    await config.exerciseC6A.registerUser(newUser, false, {from: caller});
    let result = await config.exerciseC6A.isUserRegistered.call(newUser); 

    // ASSERT
    assert.equal(result, true, "Contract owner cannot register new user");

  });

  it('function call is made when multi-party threshold is reached', async () => {
    
    // ARRANGE
    let admin1 = accounts[1];
    let admin2 = accounts[2];
    let admin3 = accounts[3];
    let admin4 = accounts[4];
    
    await config.exerciseC6A.registerUser(admin1, true, {from: config.owner});
    await config.exerciseC6A.registerUser(admin2, true, {from: config.owner});
    await config.exerciseC6A.registerUser(admin3, true, {from: config.owner});
    await config.exerciseC6A.registerUser(admin4, true, {from: config.owner});
    
    let startStatus = await config.exerciseC6A.isOperational.call(); 
    let changeStatus = !startStatus;

    // ACT
    await config.exerciseC6A.setOperatingStatus(changeStatus, {from: admin1});
    await config.exerciseC6A.setOperatingStatus(changeStatus, {from: admin2});
    
    let newStatus = await config.exerciseC6A.isOperational.call(); 

    // ASSERT
    assert.equal(changeStatus, newStatus, "Multi-party call failed");

  });

 
});
