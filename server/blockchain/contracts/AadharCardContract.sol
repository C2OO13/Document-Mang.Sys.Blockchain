// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract AadharCardContract {
    
    struct AadharCard {
        string name;
        string number;
        string ipfsHash;
        string description;
        uint id;
        uint state; // 0=Requested Approval / 1= WIP / 2= Approved / 3= Denied
    }

    mapping (uint => AadharCard) private aadharCards;

    struct AadharCardQueue{
        uint state;
        uint id;
    }
    
    mapping(uint => AadharCardQueue) private queueAadharCard;
    uint private firstAadharCard;
    uint private lastAadharCard;

    constructor(){
        lastAadharCard = 0;
        firstAadharCard = 1;
    }
    
    function enqueueAadharCard(AadharCardQueue memory data) internal {
        lastAadharCard += 1;
        queueAadharCard[lastAadharCard] = data;
    }

    function topAadharCard() internal view returns (AadharCardQueue memory data) {
        require(lastAadharCard >= firstAadharCard); 
        data = queueAadharCard[firstAadharCard];
    }

    function dequeueAadharCard() internal returns (AadharCardQueue memory data) {
        require(lastAadharCard >= firstAadharCard); 
        data = queueAadharCard[firstAadharCard];
        delete queueAadharCard[firstAadharCard];
        firstAadharCard += 1;
    }

    function getCountOfPendingAadharCard() internal view returns(uint){
        return ((lastAadharCard + 1) - firstAadharCard);
    }

    function newAadharCard(uint id, string memory _name, string memory _number, string memory _ipfsHash, string memory _description) internal returns(AadharCard memory){
        AadharCard memory c;
        c.ipfsHash = _ipfsHash;
        c.description = _description;
        c.name = _name;
        c.number = _number;
        c.state = 0;
        c.id = id;
        aadharCards[id] = c;
        return c;
    }

    function setAadharCard(uint id, string memory _name, string memory _number, string memory _ipfsHash, string memory _description) internal returns(AadharCard memory){
        AadharCard memory c;
        c.ipfsHash = _ipfsHash;
        c.description = _description;
        c.name = _name;
        c.number = _number;
        c.state = 0;
        c.id = id;
        aadharCards[id] = c;
        return c;
    }

    function approveAadharCard(uint id) internal returns (AadharCard memory){
        AadharCard memory c = aadharCards[id];
        if(c.state != 0) return c;
        c.state = 2;
        aadharCards[id] = c;
        return c;
    }
    
    function rejectAadharCard(uint id) internal returns (AadharCard memory){
        AadharCard memory c = aadharCards[id];
        if(c.state == 3) return c;
        c.state = 3;
        aadharCards[id] = c;
        return c;
    }

    function getAadharCard(uint id) internal view returns (AadharCard memory) {
        return aadharCards[id];
    }
}