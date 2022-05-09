// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract BirthCertiContract {
    
    struct BirthCertificate {
        string name;
        string dob;
        string ipfsHash;
        string description;
        string accName;
        uint state; // 0=Requested Approval / 1= WIP / 2= Approved / 3= Denied
    }

    mapping (string => BirthCertificate) private birthCertificates;

    struct BirthCerti{
        uint state;
        string accName;
    }
    
    mapping(uint => BirthCerti) private queueBirthCertificate;
    uint private firstBirthCertificate;
    uint private lastBirthCertificate;

    constructor(){
        lastBirthCertificate = 0;
        firstBirthCertificate = 1;
    }
    
    function enqueueBirthCertificate(BirthCerti memory data) internal {
        lastBirthCertificate += 1;
        queueBirthCertificate[lastBirthCertificate] = data;
    }

    function dequeueBirthCertificate() internal returns (BirthCerti memory data) {
        require(lastBirthCertificate >= firstBirthCertificate); 
        data = queueBirthCertificate[firstBirthCertificate];
        delete queueBirthCertificate[firstBirthCertificate];
        firstBirthCertificate += 1;
    }

    function getCountOfPendingBirthCertificate() public view returns(uint){
        return ((lastBirthCertificate + 1) - firstBirthCertificate);
    }

    function newBirthCerti(string memory accName, string memory _name, string memory _dob, string memory _ipfsHash, string memory _description) public {
        BirthCertificate memory c;
        c.ipfsHash = _ipfsHash;
        c.description = _description;
        c.name = _name;
        c.dob = _dob;
        c.state = 0;
        c.accName = accName;
        birthCertificates[accName] = c;
        BirthCerti memory b;
        b.state = 0;
        b.accName = accName; 
        enqueueBirthCertificate(b);
    }

    function setBirthCertificate(string memory accName, string memory _name, string memory _dob, string memory _ipfsHash, string memory _description) public {
        BirthCertificate memory c;
        c.ipfsHash = _ipfsHash;
        c.description = _description;
        c.name = _name;
        c.dob = _dob;
        c.state = 0;
        c.accName = accName;
        birthCertificates[accName] = c;
        BirthCerti memory b;
        b.state = 0;
        b.accName = accName; 
        enqueueBirthCertificate(b);
    }

    function approveBirthCertificate(string memory accName) public {
        BirthCertificate memory c = birthCertificates[accName];
        if(c.state != 0) return;
        c.state = 2;
        birthCertificates[accName] = c;
        updateBirthQueue();
    }
    
    function rejectBirthCertificate(string memory accName) public {
        BirthCertificate memory c = birthCertificates[accName];
        if(c.state == 3) return;
        c.state = 3;
        birthCertificates[accName] = c;
        updateBirthQueue();
    }

    function getBirthCertificate(string memory accName) public view returns (BirthCertificate memory) {
        return birthCertificates[accName];
    }

    function updateBirthQueue() private{
        require(lastBirthCertificate >= firstBirthCertificate); 
        uint i=firstBirthCertificate;
        while(i<=lastBirthCertificate){
            BirthCertificate memory temp = getBirthCertificate(queueBirthCertificate[i++].accName); 
            if(temp.state != 0) dequeueBirthCertificate();
            else return;
        }
    }
    
    function getAllPendingBirthCertificates() public view returns(BirthCertificate[] memory b){
        require(lastBirthCertificate >= firstBirthCertificate, "No pending birth certis"); 
        uint i=firstBirthCertificate;
        uint j=lastBirthCertificate-firstBirthCertificate;
        b = new BirthCertificate[](j+1);
        j=0;
        BirthCertificate memory temp;
        while(i<=lastBirthCertificate){
            BirthCerti memory c = queueBirthCertificate[i++];
            temp = getBirthCertificate(c.accName);
            if(temp.state == 0) b[j++] = temp;
        }
    }

}