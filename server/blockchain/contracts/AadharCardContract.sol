// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract AadharCardContract {
    
    struct AadharCard {
        string name;
        string number;
        string ipfsHash;
        string description;
        string accName;
        uint state; // 0=Requested Approval / 1= WIP / 2= Approved / 3= Denied
    }

    mapping (string => AadharCard) private aadharCards;

    struct AadharCardQueue{
        uint state;
        string accName;
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

    function dequeueAadharCard() internal returns (AadharCardQueue memory data) {
        require(lastAadharCard >= firstAadharCard); 
        data = queueAadharCard[firstAadharCard];
        delete queueAadharCard[firstAadharCard];
        firstAadharCard += 1;
    }

    function getCountOfPendingAadharCard() public view returns(uint){
        return ((lastAadharCard + 1) - firstAadharCard);
    }

    function newAadharCard(string memory accName, string memory _name, string memory _number, string memory _ipfsHash, string memory _description) public {
        AadharCard memory c;
        c.ipfsHash = _ipfsHash;
        c.description = _description;
        c.name = _name;
        c.number = _number;
        c.state = 0;
        c.accName = accName;
        aadharCards[accName] = c;
        AadharCardQueue memory b;
        b.state = 0;
        b.accName = accName; 
        enqueueAadharCard(b);
    }

    function setAadharCard(string memory accName, string memory _name, string memory _number, string memory _ipfsHash, string memory _description) public{
        AadharCard memory c;
        c.ipfsHash = _ipfsHash;
        c.description = _description;
        c.name = _name;
        c.number = _number;
        c.state = 0;
        c.accName = accName;
        aadharCards[accName] = c;
        AadharCardQueue memory b;
        b.state = 0;
        b.accName = accName; 
        enqueueAadharCard(b);
    }

    function approveAadharCard(string memory accName) public {
        AadharCard memory c = aadharCards[accName];
        if(c.state != 0) return;
        c.state = 2;
        aadharCards[accName] = c;
        updateAadharQueue();
    }
    
    function rejectAadharCard(string memory accName) public {
        AadharCard memory c = aadharCards[accName];
        if(c.state == 3) return;
        c.state = 3;
        aadharCards[accName] = c;
        updateAadharQueue();
    }

    function getAadharCard(string memory accName) public view returns (AadharCard memory) {
        return aadharCards[accName];
    }

    function updateAadharQueue() private{
        require(lastAadharCard >= firstAadharCard); 
        uint i=firstAadharCard;
        while(i<=lastAadharCard && getAadharCard(queueAadharCard[i++].accName).state != 0){
            AadharCard memory temp = getAadharCard(queueAadharCard[i++].accName); 
            if(temp.state != 0) dequeueAadharCard();
            else return;
        }
    }

    function getAllPendingAadharCards() public view returns(AadharCard[] memory b){
        require(lastAadharCard >= firstAadharCard, "No pending aadhar cards"); 
        uint i=firstAadharCard;
        uint j=lastAadharCard-firstAadharCard;
        b = new AadharCard[](j+1);
        j=0;
        AadharCard memory temp;
        while(i<=lastAadharCard){
            AadharCardQueue memory c = queueAadharCard[i++];
            temp = getAadharCard(c.accName);
            if(temp.state == 0) b[j++] = temp;
        }
    }
}