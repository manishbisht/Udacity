pragma solidity ^0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract FlightSuretyData {
    using SafeMath for uint256;

    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    address private contractOwner;                                      // Account used to deploy contract
    bool private operational = true;                                   // Blocks all state changes throughout the contract if false
    mapping(address => uint256) private walletBalance;
    address[] private airlines;
    address[] private activeAirlines;
    mapping(address => bool) private activatedAirlines;
    mapping(address => address[]) private airlineVotes;
    struct Insurance {
        bytes32 id;
        address owner;
        uint256 amount;
        bool isRefunded;
    }
    mapping(bytes32 => Insurance) private flightInsuranceDetails;
    mapping(bytes32 => address[]) private flightInsurances;

    event airlineRegistered(address airlineAddress);
    event airlineFunded(address airlineAddress);
    event insurancePurchased(address airline, string flight, uint256 timestamp, address senderAddress, uint256 insuranceAmount);
    event insuranceClaimed(address airline, string flight, uint256 timestamp, address passenger, uint256 amountCreditedToPassenger);
    event amountWithdrawn(address senderAddress, uint amount);


    /********************************************************************************************/
    /*                                       EVENT DEFINITIONS                                  */
    /********************************************************************************************/


    /**
    * @dev Constructor
    *      The deploying account becomes contractOwner
    */
    constructor() public {
        contractOwner = msg.sender;
        airlines.push(msg.sender);
        activatedAirlines[msg.sender] = false;
        activeAirlines.push(msg.sender);
    }

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
    modifier requireIsOperational() {
        require(operational, "Contract is currently not operational");
        _;
        // All modifiers require an "_" which indicates where the function body will be added
    }

    /**
    * @dev Modifier that requires the "ContractOwner" account to be the function caller
    */
    modifier requireContractOwner() {
        require(msg.sender == contractOwner, "Caller is not contract owner");
        _;
    }

    /********************************************************************************************/
    /*                                       UTILITY FUNCTIONS                                  */
    /********************************************************************************************/

    /**
    * @dev Get operating status of contract
    *
    * @return A bool that is the current operating status
    */
    function isOperational() external view returns (bool) {
        return operational;
    }

    /**
    * @dev Sets contract operations on/off
    *
    * When operational mode is disabled, all write transactions except for this one will fail
    */
    function setOperatingStatus(bool mode) external requireContractOwner {
        require(mode != operational, "New mode should be different from current mode");
        operational = mode;
    }

    /********************************************************************************************/
    /*                                     SMART CONTRACT FUNCTIONS                             */
    /********************************************************************************************/

    /**
     * @dev Get the list of airline votes
     *      Can only be called from FlightSuretyApp contract
     *
     */
    function getAirlineVotes(address newAirline) external view requireIsOperational returns(address[]) {
        return airlineVotes[newAirline];
    }

    /**
     * @dev Get the list of airline votes
     *      Can only be called from FlightSuretyApp contract
     *
     */
    function addAirlineVotes(address newAirline, address senderAddress) external requireIsOperational returns(address[]) {
        airlineVotes[newAirline].push(senderAddress);
    }

    /**
     * @dev check if the airline has voted
     *      Can only be called from FlightSuretyApp contract
     *
     */
    function isAirlineVoted(address newAirline, address senderAddress) external view requireIsOperational returns (bool) {
        bool isAlreadyVoted = false;
        for(uint i = 0; i < airlineVotes[newAirline].length; i++) {
            if(airlineVotes[newAirline][i] == senderAddress) {
                isAlreadyVoted = true;
            }
        }
        return isAlreadyVoted;
    }

    /**
     * @dev Add an airline to the registration queue
     *      Can only be called from FlightSuretyApp contract
     *
     */
    function registerAirline(address newAirline) external requireIsOperational {
        airlines.push(newAirline);
        activatedAirlines[newAirline] = false;
        emit airlineRegistered(newAirline);
    }

    function isAirlineRegistered(address newAirline) external view requireIsOperational returns(bool) {
        bool isRegistered = false;
        for(uint i = 0; i < airlines.length; i++) {
            if(airlines[i] == newAirline) {
                isRegistered = true;
            }
        }
        return isRegistered;
    }

    /**
     * @dev Activate an airline
     *      Can only be called from FlightSuretyApp contract
     *
     */
    function activateAirline(address airlineAddress) external payable requireIsOperational {
        activatedAirlines[airlineAddress] = true;
        activeAirlines.push(airlineAddress);
        fund(airlineAddress);
        emit airlineFunded(airlineAddress);
    }

    /**
     * @dev Check if the airline is funded/activated
     *      Can only be called from FlightSuretyApp contract
     *
     */
    function isAirlineActivated(address airlineAddress) external view requireIsOperational returns(bool) {
        return activatedAirlines[airlineAddress];
    }

    /**
     * @dev Get the list of registered airlines
     *      Can only be called from FlightSuretyApp contract
     *
     */
    function getRegisteredAirlines() external view requireIsOperational returns(address[]) {
        return airlines;
    }

    /**
     * @dev Get the list of activated/funded airlines
     *      Can only be called from FlightSuretyApp contract
     *
     */
    function getActiveAirlines() external view requireIsOperational returns(address[]) {
        return activeAirlines;
    }

    /**
     * @dev Buy insurance for a flight
     *
     */
    function buyInsurance(address airline, string flight, uint256 timestamp, address passenger, uint256 insuranceAmount) external payable requireIsOperational {
        bytes32 flightKey = getFlightKey(airline, flight, timestamp);
        bytes32 insuranceKey = keccak256(abi.encodePacked(flightKey, passenger));
        flightInsuranceDetails[insuranceKey] = Insurance({
            id: insuranceKey,
            owner: passenger,
            amount: insuranceAmount,
            isRefunded: false
        });
        flightInsurances[flightKey].push(passenger);
        fund(airline);
        emit insurancePurchased(airline, flight, timestamp, passenger, insuranceAmount);
    }

    /**
     *  @dev Claim the insurance amount for a flight
    */
    function claimInsuranceAmount(address airline, string flight, uint256 timestamp, address airlineAddress, address passenger) external requireIsOperational {
        bytes32 flightKey = getFlightKey(airline, flight, timestamp);
        bytes32 insuranceKey = keccak256(abi.encodePacked(flightKey, passenger));
        require(flightInsuranceDetails[insuranceKey].id == insuranceKey, "You have not purchased the insurance for this flight.");
        require(!flightInsuranceDetails[insuranceKey].isRefunded, "You have already claimed the insurance amount.");
        uint256 currentAirlineBalance = walletBalance[airlineAddress];
        uint256 amountCreditedToPassenger = flightInsuranceDetails[insuranceKey].amount.mul(15).div(10);
        require(currentAirlineBalance >= amountCreditedToPassenger, "Airline Doesn't have enough funds. Please check later.");
        flightInsuranceDetails[insuranceKey].isRefunded = true;
        walletBalance[airlineAddress] = currentAirlineBalance.sub(amountCreditedToPassenger);
        walletBalance[passenger] = walletBalance[passenger].add(amountCreditedToPassenger);
        emit insuranceClaimed(airline, flight, timestamp, passenger, amountCreditedToPassenger);
    }


    /**
     *  @dev Transfers balance to their wallet
     *
    */
    function withdrawAmount(address senderAddress) external payable {
        require(walletBalance[senderAddress] > 0, "There is no balance available in your wallet");
        uint256 withdrawAmount = walletBalance[senderAddress];
        walletBalance[senderAddress] = 0;
        senderAddress.transfer(withdrawAmount);
        emit amountWithdrawn(senderAddress, withdrawAmount);
    }

    /**
     * @dev Initial funding for the insurance. Unless there are too many delayed flights
     *      resulting in insurance payouts, the contract should be self-sustaining
     *
     */
    function fund(address senderAddress) public payable {
        walletBalance[senderAddress] = walletBalance[senderAddress].add(msg.value);
    }

    function getFlightKey(address airline, string memory flight, uint256 timestamp) pure internal returns (bytes32) {
        return keccak256(abi.encodePacked(airline, flight, timestamp));
    }

    /**
    * @dev Fallback function for funding smart contract.
    *
    */
    function() external payable {
        fund(msg.sender);
    }
}