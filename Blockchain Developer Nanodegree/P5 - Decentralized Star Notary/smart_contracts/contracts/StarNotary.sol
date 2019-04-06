pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Mintable.sol';

contract StarNotary is ERC721Mintable {

    struct Star {
        string name;
        string story;
        string ra;
        string dec;
        string mag;
    }

    mapping(uint256 => Star) public _tokenIdToStarInfo;
    mapping(uint256 => bool) _isTokenId;
    mapping(bytes32 => uint256) _isStar;
    mapping(uint256 => uint256) public _starsForSale;

    constructor(string name, string symbol) ERC721Full (name, symbol) public {}

    function createStar(string _name, string _story, string _ra, string _dec, string _mag, uint256 _tokenId) public {
        require(checkIfStarExists(_ra, _dec, _mag) == false, "ERROR: The star with these coordinates already exists");

        Star memory starData = Star(_name, _story, concatTwoStrings("ra_", _ra), concatTwoStrings("dec_", _dec), concatTwoStrings("mag_", _mag));

        _tokenIdToStarInfo[_tokenId] = starData;
        _isTokenId[_tokenId] = true;
        bytes memory coordinates = bytes(concatThreeStrings(_ra, _dec, _mag));
        bytes32 coordinatesHash = keccak256(coordinates);
        _isStar[coordinatesHash] = _tokenId;

        _mint(msg.sender, _tokenId);
    }

    function checkIfStarExists(string _ra, string _dec, string _mag) public view returns (bool) {
        bytes memory coordinates = bytes(concatThreeStrings(_ra, _dec, _mag));
        if (_isStar[keccak256(coordinates)] != 0) {
            return true;
        }
        return false;
    }

    function tokenIdToStarInfo(uint256 _tokenId) public view returns (string name, string story, string ra, string dec, string mag) {
        require(_isTokenId[_tokenId] == true, "ERROR: This token does not exists");
        Star memory starData = _tokenIdToStarInfo[_tokenId];
        return (starData.name, starData.story, starData.ra, starData.dec, starData.mag);
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(this.ownerOf(_tokenId) == msg.sender);

        _starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable {
        require(_starsForSale[_tokenId] > 0);

        uint256 starCost = _starsForSale[_tokenId];
        address starOwner = this.ownerOf(_tokenId);
        require(msg.value >= starCost);

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);

        starOwner.transfer(starCost);

        if (msg.value > starCost) {
            msg.sender.transfer(msg.value - starCost);
        }
    }

    function concatTwoStrings(string _string1, string _string2) internal constant returns (string){
        bytes memory string1 = bytes(_string1);
        bytes memory string2 = bytes(_string2);

        string memory combinedString = new string(string1.length + string2.length);

        bytes memory combinedStringArray = bytes(combinedString);

        for (uint i = 0; i < string1.length; i++) {
            combinedStringArray[i] = string1[i];
        }

        for (i = 0; i < string2.length; i++) {
            combinedStringArray[string1.length + i] = string2[i];
        }

        return string(combinedStringArray);
    }

    function concatThreeStrings(string _string1, string _string2, string _string3) internal constant returns (string) {
        return concatTwoStrings(concatTwoStrings(_string1, _string2), _string3);
    }
}