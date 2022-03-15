// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract PassportCertiContract {
    
    struct PassportCertificate {
        string name;
        string dob;
        string ipfsHash;
        string description;
        uint id;
        uint state; // 0=Requested Approval / 1= WIP / 2= Approved / 3= Denied
    }

    mapping (uint => PassportCertificate) private passportCertificates;

    struct PassportCerti{
        uint state;
        uint id;
    }
    
    mapping(uint => PassportCerti) private queuePassportCertificate;
    uint private firstPassportCertificate;
    uint private lastPassportCertificate;

    constructor(){
        lastPassportCertificate = 0;
        firstPassportCertificate = 1;
    }
    
    function enqueuePassportCertificate(PassportCerti memory data) internal {
        lastPassportCertificate += 1;
        queuePassportCertificate[lastPassportCertificate] = data;
    }

    function topPassportCertificate() internal view returns (PassportCerti memory data) {
        require(lastPassportCertificate >= firstPassportCertificate); 
        data = queuePassportCertificate[firstPassportCertificate];
    }

    function dequeuePassportCertificate() internal returns (PassportCerti memory data) {
        require(lastPassportCertificate >= firstPassportCertificate); 
        data = queuePassportCertificate[firstPassportCertificate];
        delete queuePassportCertificate[firstPassportCertificate];
        firstPassportCertificate += 1;
    }

    function getCountOfPendingPassportCertificate() internal view returns(uint){
        return ((lastPassportCertificate + 1) - firstPassportCertificate);
    }

    function newPassportCertificate(uint id, string memory _name, string memory _dob, string memory _ipfsHash, string memory _description) internal returns(PassportCertificate memory){
        PassportCertificate memory c;
        c.ipfsHash = _ipfsHash;
        c.description = _description;
        c.name = _name;
        c.dob = _dob;
        c.state = 0;
        c.id = id;
        passportCertificates[id] = c;
        return c;
    }

    function setPassportCertificate(uint id, string memory _name, string memory _dob, string memory _ipfsHash, string memory _description) internal returns(PassportCertificate memory){
        PassportCertificate memory c;
        c.ipfsHash = _ipfsHash;
        c.description = _description;
        c.name = _name;
        c.dob = _dob;
        c.state = 0;
        c.id = id;
        passportCertificates[id] = c;
        return c;
    }

    function approvePassportCertificate(uint id) internal returns (PassportCertificate memory){
        PassportCertificate memory c = passportCertificates[id];
        if(c.state != 0) return c;
        c.state = 2;
        passportCertificates[id] = c;
        return c;
    }
    
    function rejectPassportCertificate(uint id) internal returns (PassportCertificate memory){
        PassportCertificate memory c = passportCertificates[id];
        if(c.state == 3) return c;
        c.state = 3;
        passportCertificates[id] = c;
        return c;
    }

    function getPassportCertificate(uint id) internal view returns (PassportCertificate memory) {
        return passportCertificates[id];
    }
}


    