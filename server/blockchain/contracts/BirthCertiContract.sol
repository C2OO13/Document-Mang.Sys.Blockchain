// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract BirthCertiContract {
    
    struct BirthCertificate {
        string name;
        string dob;
        string ipfsHash;
        string description;
        uint id;
        uint state; // 0=Requested Approval / 1= WIP / 2= Approved / 3= Denied
    }

    mapping (uint => BirthCertificate) private birthCertificates;

    struct BirthCerti{
        uint state;
        uint id;
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

    function topBirthCertificate() internal view returns (BirthCerti memory data) {
        require(lastBirthCertificate >= firstBirthCertificate); 
        data = queueBirthCertificate[firstBirthCertificate];
    }

    function dequeueBirthCertificate() internal returns (BirthCerti memory data) {
        require(lastBirthCertificate >= firstBirthCertificate); 
        data = queueBirthCertificate[firstBirthCertificate];
        delete queueBirthCertificate[firstBirthCertificate];
        firstBirthCertificate += 1;
    }

    function getCountOfPendingBirthCertificate() internal view returns(uint){
        return ((lastBirthCertificate + 1) - firstBirthCertificate);
    }

    function newBirthCertificate(uint id, string memory _name, string memory _dob, string memory _ipfsHash, string memory _description) internal returns(BirthCertificate memory){
        BirthCertificate memory c;
        c.ipfsHash = _ipfsHash;
        c.description = _description;
        c.name = _name;
        c.dob = _dob;
        c.state = 0;
        c.id = id;
        birthCertificates[id] = c;
        return c;
    }

    function setBirthCertificate(uint id, string memory _name, string memory _dob, string memory _ipfsHash, string memory _description) internal returns(BirthCertificate memory){
        BirthCertificate memory c;
        c.ipfsHash = _ipfsHash;
        c.description = _description;
        c.name = _name;
        c.dob = _dob;
        c.state = 0;
        c.id = id;
        birthCertificates[id] = c;
        return c;
    }

    function approveBirthCertificate(uint id) internal returns (BirthCertificate memory){
        BirthCertificate memory c = birthCertificates[id];
        if(c.state != 0) return c;
        c.state = 2;
        birthCertificates[id] = c;
        return c;
    }
    
    function rejectBirthCertificate(uint id) internal returns (BirthCertificate memory){
        BirthCertificate memory c = birthCertificates[id];
        if(c.state == 3) return c;
        c.state = 3;
        birthCertificates[id] = c;
        return c;
    }

    function getBirthCertificate(uint id) internal view returns (BirthCertificate memory) {
        return birthCertificates[id];
    }
}