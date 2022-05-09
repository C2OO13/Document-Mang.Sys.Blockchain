// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract PassportCertiContract {
    
    struct PassportCertificate {
        string name;
        string dob;
        string ipfsHash;
        string description;
        string accName;
        uint state; // 0=Requested Approval / 1= WIP / 2= Approved / 3= Denied
    }

    mapping (string => PassportCertificate) private passportCertificates;

    struct PassportCerti{
        uint state;
        string accName;
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

    function dequeuePassportCertificate() internal returns (PassportCerti memory data) {
        require(lastPassportCertificate >= firstPassportCertificate); 
        data = queuePassportCertificate[firstPassportCertificate];
        delete queuePassportCertificate[firstPassportCertificate];
        firstPassportCertificate += 1;
    }

    function getCountOfPendingPassportCertificate() public view returns(uint){
        return ((lastPassportCertificate + 1) - firstPassportCertificate);
    }

    function newPassportCertificate(string memory accName, string memory _name, string memory _dob, string memory _ipfsHash, string memory _description) public {
        PassportCertificate memory c;
        c.ipfsHash = _ipfsHash;
        c.description = _description;
        c.name = _name;
        c.dob = _dob;
        c.state = 0;
        c.accName = accName;
        passportCertificates[accName] = c;
        PassportCerti memory b;
        b.state = 0;
        b.accName = accName; 
        enqueuePassportCertificate(b);
    }

    function setPassportCertificate(string memory accName, string memory _name, string memory _dob, string memory _ipfsHash, string memory _description) public {
        PassportCertificate memory c;
        c.ipfsHash = _ipfsHash;
        c.description = _description;
        c.name = _name;
        c.dob = _dob;
        c.state = 0;
        c.accName = accName;
        passportCertificates[accName] = c;
        PassportCerti memory b;
        b.state = 0;
        b.accName = accName; 
        enqueuePassportCertificate(b);
    }

    function approvePassportCertificate(string memory accName) public{
        PassportCertificate memory c = passportCertificates[accName];
        if(c.state != 0) return;
        c.state = 2;
        passportCertificates[accName] = c;
        updatePassportQueue();
    }
    
    function rejectPassportCertificate(string memory accName) public {
        PassportCertificate memory c = passportCertificates[accName];
        if(c.state == 3) return;
        c.state = 3;
        passportCertificates[accName] = c;
        updatePassportQueue();
    }

    function getPassportCertificate(string memory accName) public view returns (PassportCertificate memory) {
        return passportCertificates[accName];
    }

    function updatePassportQueue() private{
        require(lastPassportCertificate >= firstPassportCertificate); 
        uint i=firstPassportCertificate;
        while(i<=lastPassportCertificate){
            PassportCertificate memory temp = getPassportCertificate(queuePassportCertificate[i++].accName);
            if(temp.state != 0) dequeuePassportCertificate();
            else return;
        }
    }

    function getAllPendingPassportCertis() public view returns(PassportCertificate[] memory b){
        require(lastPassportCertificate >= firstPassportCertificate, "No pending passports!"); 
        uint i=firstPassportCertificate;
        uint j=lastPassportCertificate-firstPassportCertificate;
        b = new PassportCertificate[](j+1);
        j=0;
        PassportCertificate memory temp;
        while(i<=lastPassportCertificate){
            PassportCerti memory c = queuePassportCertificate[i++];
            temp = getPassportCertificate(c.accName);
            if(temp.state == 0) b[j++] = temp;
        }
    }

}


    