pragma solidity >=0.4.21 <0.6.0;

import '../../zokrates/code/square/Verifier.sol';
import './ERC721Mintable.sol';

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
//contract VerifierInterFace {
//    function verifyTx(uint[2] memory a, uint[2] memory a_p, uint[2][2] memory b, uint[2] memory b_p, uint[2] memory c, uint[2] memory c_p, uint[2] memory h, uint[2] memory k, uint[2] memory input) public returns(bool) {
//    }
//}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721Mintable {

    Verifier verifier;

    constructor(address verifierAddress, string memory name, string memory symbol, string memory baseTokenURI) public ERC721Mintable(name, symbol, baseTokenURI) {
        verifier = Verifier(verifierAddress);
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        bytes32 index;
        address solverAddress;
    }

    // TODO define an array of the above struct
    bytes32[] private solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private solutionsSubmitted;

    // TODO Create an event to emit when a solution is added
    event solutionAdded(uint[2] input, bytes32 solutionKey, address to);

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(uint[2] memory a, uint[2] memory a_p, uint[2][2] memory b, uint[2] memory b_p, uint[2] memory c, uint[2] memory c_p, uint[2] memory h, uint[2] memory k, uint[2] memory input, address to) public returns (bool) {
        bytes32 solutionKey = keccak256(abi.encodePacked(input[0], input[1]));
        bool isUniqueSolution = true;
        for(uint i = 0; i < solutions.length; i++) {
            if(solutionKey == solutions[i]) {
                isUniqueSolution = false;
            }
        }
        require(isUniqueSolution, "Given solution is not unique");
        require(verifier.verifyTx(a, a_p, b, b_p, c, c_p, h, k, input), "Unable to verify the solution");
        solutionsSubmitted[solutionKey] = Solution({
            index: solutionKey,
            solverAddress: to
            });
        solutions.push(solutionKey);
        emit solutionAdded(input, solutionKey, to);
        return true;
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNewToken(uint[2] memory a, uint[2] memory a_p, uint[2][2] memory b, uint[2] memory b_p, uint[2] memory c, uint[2] memory c_p, uint[2] memory h, uint[2] memory k, uint[2] memory input, address to, uint256 tokenId) public returns (bool) {
        require(addSolution(a, a_p, b, b_p, c, c_p, h, k, input, to), "Unable to add the solution");
        return super.mint(to, tokenId);
    }
}