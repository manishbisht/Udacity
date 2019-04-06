pragma solidity ^0.4.24;

// It's important to avoid vulnerabilities due to numeric overflow bugs
// OpenZeppelin's SafeMath library, when used correctly, protects agains such bugs
// More info: https://www.nccgroup.trust/us/about-us/newsroom-and-events/blog/2018/november/smart-contract-insecurity-bad-arithmetic/

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./FlightSuretyData.sol";

/************************************************** */
/* FlightSurety Smart Contract                      */
/************************************************** */
contract FlightSuretyApp {
    using SafeMath for uint256; // Allow SafeMath functions to be called for all uint256 types (similar to "prototype" in Javascript)

    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    // Flight status codees
    uint8 private constant STATUS_CODE_UNKNOWN = 0;
    uint8 private constant STATUS_CODE_ON_TIME = 10;
    uint8 private constant STATUS_CODE_LATE_AIRLINE = 20;
    uint8 private constant STATUS_CODE_LATE_WEATHER = 30;
    uint8 private constant STATUS_CODE_LATE_TECHNICAL = 40;
    uint8 private constant STATUS_CODE_LATE_OTHER = 50;

    address public contractOwner;          // Account used to deploy contract
    FlightSuretyData flightSuretyData;

    uint constant airlineRegistrationConstant = 4;

    struct Flight {
        bool isRegistered;
        uint8 statusCode;
        uint256 updatedTimestamp;        
        address airline;
    }
    mapping(bytes32 => Flight) private flights;

    /********************************************************************************************/
    /*                                       FUNCTION MODIFIERS                                 */
    /********************************************************************************************/

    // Modifiers help avoid duplication of code. They are typically used to validate something
    // before a function is allowed to be executed.

    /**
    * @dev Modifier that requires the "operational" boolean variable to be "true"
    *      This is used on all state changing functions to pause the contract in 
    *      the event there is an issue that needs to be fixed
    */
    modifier requireIsOperational() 
    {
         // Modify to call data contract's status
        require(true, "Contract is currently not operational");  
        _;  // All modifiers require an "_" which indicates where the function body will be added
    }

    /**
    * @dev Modifier that requires the "ContractOwner" account to be the function caller
    */
    modifier requireContractOwner()
    {
        require(msg.sender == contractOwner, "Caller is not contract owner");
        _;
    }

    /********************************************************************************************/
    /*                                       CONSTRUCTOR                                        */
    /********************************************************************************************/

    /**
    * @dev Contract constructor
    *
    */
    constructor(address dataContract) public {
        contractOwner = msg.sender;
        flightSuretyData = FlightSuretyData(dataContract);
    }

    /********************************************************************************************/
    /*                                       UTILITY FUNCTIONS                                  */
    /********************************************************************************************/

    function isOperational() public view returns(bool) {
        return flightSuretyData.isOperational();  // Modify to call data contract's status
    }

    /********************************************************************************************/
    /*                                     SMART CONTRACT FUNCTIONS                             */
    /********************************************************************************************/

  
   /**
    * @dev Add an airline to the registration queue
    *
    */   
    function registerAirline(address newAirline) external returns(bool success, uint256 votes) {
        require(isOperational(), "Service is not available");
        require(flightSuretyData.isAirlineActivated(msg.sender), "Your airline is not activated");
        require(!flightSuretyData.isAirlineRegistered(newAirline), "This airline is already registered");
        require(!flightSuretyData.isAirlineVoted(newAirline, msg.sender), "You have already voted for this airline");
        flightSuretyData.addAirlineVotes(newAirline, msg.sender);
        address[] memory registeredAirlines = flightSuretyData.getRegisteredAirlines();
        address[] memory airlineVotes = flightSuretyData.getAirlineVotes(newAirline);
        if(registeredAirlines.length >= airlineRegistrationConstant) {
            if(airlineVotes.length >= registeredAirlines.length / 2) {
                flightSuretyData.registerAirline(newAirline);
                success = true;
            } else {
                success = false;
            }
        } else {
            flightSuretyData.registerAirline(newAirline);
            success = true;
        }
        return (success, airlineVotes.length);
    }

    /**
    * @dev Check if the airline is activated
    *
    */
    function isAirlineRegistered(address newAirline) external view returns(bool) {
        require(isOperational(), "Service is not available");
        return flightSuretyData.isAirlineRegistered(newAirline);
    }

    /**
    * @dev Activate an airline
    *
    */
    function activateAirline(address airlineAddress) external payable {
        require(isOperational(), "Service is not available");
        require(flightSuretyData.isAirlineRegistered(airlineAddress), "This airline is not registered");
        require(!flightSuretyData.isAirlineActivated(airlineAddress), "This airline is already activated");
        require(msg.value == 10 ether, "Please submit 10 ether to activate your airline");
        flightSuretyData.activateAirline.value(msg.value)(airlineAddress);
    }

    /**
    * @dev Check if the airline is activated
    *
    */
    function isAirlineActivated(address airlineAddress) external view returns(bool) {
        require(isOperational(), "Service is not available");
        return flightSuretyData.isAirlineActivated(airlineAddress);
    }

    /**
    * @dev Get the list of activated/funded airlines
    *
    */
    function getActiveAirlines() external view returns(address[]) {
        require(isOperational(), "Service is not available");
        return flightSuretyData.getActiveAirlines();
    }

    /**
     * @dev Buy insurance for a flight
     *
     */
    function buyInsurance(address airline, string flight, uint256 timestamp, address passenger) external payable {
        require(isOperational(), "Service is not available");
        require(msg.value <= 1 ether, "Amount should be less than or equal to 1 ether");
        flightSuretyData.buyInsurance.value(msg.value)(airline, flight, timestamp, passenger, msg.value);
    }

    /**
     * @dev Claim the insurance amount for a flight
     *
     */
    function claimInsuranceAmount(address airline, string flight, uint256 timestamp, address passenger) external {
        require(isOperational(), "Service is not available");
        flightSuretyData.claimInsuranceAmount(airline, flight, timestamp, airline, passenger);
    }

    /**
     * @dev Withdraw amount to their wallet
     *
     */
    function withdrawAmount() external {
        require(isOperational(), "Service is not available");
        flightSuretyData.withdrawAmount(msg.sender);
    }
    
   /**
    * @dev Called after oracle has updated flight status
    *
    */  
    function processFlightStatus(address airline, string memory flight, uint256 timestamp, uint8 statusCode) internal pure {

    }


    // Generate a request for oracles to fetch flight information
    function fetchFlightStatus(address airline, string flight, uint256 timestamp) external {
        require(flightSuretyData.isAirlineRegistered(airline), "This airline is not registered");
        require(flightSuretyData.isAirlineActivated(airline), "This airline is not activated");
        uint8 index = getRandomIndex(msg.sender);

        // Generate a unique key for storing the request
        bytes32 key = keccak256(abi.encodePacked(index, airline, flight, timestamp));
        oracleResponses[key] = ResponseInfo({
            requester: msg.sender,
            isOpen: true
        });

        emit OracleRequest(index, airline, flight, timestamp);
    } 


    // region ORACLE MANAGEMENT

    // Incremented to add pseudo-randomness at various points
    uint8 private nonce = 0;    

    // Fee to be paid when registering oracle
    uint256 public constant REGISTRATION_FEE = 1 ether;

    // Number of oracles that must respond for valid status
    uint256 private constant MIN_RESPONSES = 3;


    struct Oracle {
        bool isRegistered;
        uint8[3] indexes;        
    }

    // Track all registered oracles
    mapping(address => Oracle) private oracles;

    // Model for responses from oracles
    struct ResponseInfo {
        address requester;                              // Account that requested status
        bool isOpen;                                    // If open, oracle responses are accepted
        mapping(uint8 => address[]) responses;          // Mapping key is the status code reported
                                                        // This lets us group responses and identify
                                                        // the response that majority of the oracles
    }

    // Track all oracle responses
    // Key = hash(index, flight, timestamp)
    mapping(bytes32 => ResponseInfo) private oracleResponses;

    // Event fired each time an oracle submits a response
    event FlightStatusInfo(address airline, string flight, uint256 timestamp, uint8 status);

    event OracleReport(address airline, string flight, uint256 timestamp, uint8 status);

    // Event fired when flight status request is submitted
    // Oracles track this and if they have a matching index
    // they fetch data and submit a response
    event OracleRequest(uint8 index, address airline, string flight, uint256 timestamp);


    // Register an oracle with the contract
    function registerOracle() external payable {
        // Require registration fee
        require(msg.value >= REGISTRATION_FEE, "Registration fee is required");

        uint8[3] memory indexes = generateIndexes(msg.sender);

        oracles[msg.sender] = Oracle({
            isRegistered: true,
            indexes: indexes
        });
    }

    function getMyIndexes() view external returns(uint8[3]) {
        require(oracles[msg.sender].isRegistered, "Not registered as an oracle");

        return oracles[msg.sender].indexes;
    }

    // Called by oracle when a response is available to an outstanding request
    // For the response to be accepted, there must be a pending request that is open
    // and matches one of the three Indexes randomly assigned to the oracle at the
    // time of registration (i.e. uninvited oracles are not welcome)
    function submitOracleResponse(uint8 index, address airline, string flight, uint256 timestamp, uint8 statusCode) external {
        require((oracles[msg.sender].indexes[0] == index) || (oracles[msg.sender].indexes[1] == index) || (oracles[msg.sender].indexes[2] == index), "Index does not match oracle request");

        bytes32 key = keccak256(abi.encodePacked(index, airline, flight, timestamp)); 
        require(oracleResponses[key].isOpen, "Flight or timestamp do not match oracle request");

        oracleResponses[key].responses[statusCode].push(msg.sender);

        // Information isn't considered verified until at least MIN_RESPONSES
        // oracles respond with the *** same *** information
        emit OracleReport(airline, flight, timestamp, statusCode);
        if (oracleResponses[key].responses[statusCode].length >= MIN_RESPONSES) {

            emit FlightStatusInfo(airline, flight, timestamp, statusCode);

            // Handle flight status as appropriate
            processFlightStatus(airline, flight, timestamp, statusCode);
        }
    }


    function getFlightKey(address airline, string flight, uint256 timestamp) pure internal returns(bytes32) {
        return keccak256(abi.encodePacked(airline, flight, timestamp));
    }

    // Returns array of three non-duplicating integers from 0-9
    function generateIndexes(address account) internal returns(uint8[3]) {
        uint8[3] memory indexes;
        indexes[0] = getRandomIndex(account);
        
        indexes[1] = indexes[0];
        while(indexes[1] == indexes[0]) {
            indexes[1] = getRandomIndex(account);
        }

        indexes[2] = indexes[1];
        while((indexes[2] == indexes[0]) || (indexes[2] == indexes[1])) {
            indexes[2] = getRandomIndex(account);
        }

        return indexes;
    }

    // Returns array of three non-duplicating integers from 0-9
    function getRandomIndex(address account) internal returns (uint8) {
        uint8 maxValue = 10;

        // Pseudo random number...the incrementing nonce adds variation
        uint8 random = uint8(uint256(keccak256(abi.encodePacked(blockhash(block.number - nonce++), account))) % maxValue);

        if (nonce > 250) {
            nonce = 0;  // Can only fetch blockhashes for last 256 blocks so we adapt
        }

        return random;
    }

    // endregion

}
