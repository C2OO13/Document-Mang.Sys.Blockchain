// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "./Login.sol";
import "./BirthCertiContract.sol";
import "./AadharCardContract.sol";
import "./ShareCertificateContract.sol";
import "./PassportCertiContract.sol";

contract Dashboard is Login, BirthCertiContract, AadharCardContract, ShareCertificateContract, PassportCertiContract{

    address public owner;

    constructor(){
        owner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == owner, "Caller is not Owner");
        _;
    }

    function getId(string memory accName) public view returns(uint){
        return accountName_userId[accName];
    }

    function getUser(string memory accName) public view returns(User memory){
        return userId_user[getId(accName)];
    }

    function isAdmin(string memory accName) public view returns(bool){
        User memory u = getUser(accName);
        if(u.profile == 3) return true;
        return false;
    }

    function isApprover(string memory accName) public view returns(bool){
        User memory u = getUser(accName);
        if(u.profile == 2 || isAdmin(accName)) return true;
        return false;
    }

    function login(string memory name, string memory pwd) public view returns(User memory u){
        uint id = openLogin(name, pwd);
        if(id>0){
            u = userId_user[id];
            return u;
        }
    } 

    function registerApplicant(string memory _accountName, string memory _name, string memory _password) public returns(bool){
        uint id = signUpApplicant(_accountName,_name,_password);
        if(id>0) return true;
        return false;    
    }

    function registerApprover(string memory _accNameAdmin, string memory _passwordAdmin, string memory _accountName, string memory _name, string memory _password) public returns(bool){
        User memory u = login(_accNameAdmin,_passwordAdmin);
        require(isAdmin(u.accountName) == true, "Admin rights required");
        uint id = signUpApprover(_accountName,_name,_password);
        if(id>0) return true;
        return false;    
    }

    function registerAdmin(string memory _accountName, string memory _name, string memory _password) public isOwner returns(bool){
        uint id = signUpAdmin(_accountName,_name,_password);
        if(id>0) return true;
        return false;    
    }

    function changePassword(string memory _accountName, string memory _password, string memory _newPassword) public returns(bool){
        return changePwd(_accountName,_password,_newPassword);
    }

    // Birth Certificate functions
    // All certis will have to approved in FCFS order 
    
    function newBirthCerti(string memory accName, string memory _name, string memory _dob, string memory _ipfsHash, string memory _description) public returns(BirthCertificate memory c){
        c = newBirthCertificate(getId(accName),_name,_dob,_ipfsHash,_description);        
        BirthCerti memory b;
        b.state = 0;
        b.id = getId(accName); 
        enqueueBirthCertificate(b);
        return c; 
    }  

    function setBirthCerti(string memory accName, string memory _name, string memory _dob, string memory _ipfsHash, string memory _description) public returns(BirthCertificate memory c){
        uint id = getId(accName);
        c = getBirthCerti(accName);
        require(c.id == id && id != 0, "Birth Certificate not found!");
        c = setBirthCertificate(id,_name,_dob,_ipfsHash,_description);
        BirthCerti memory b;
        b.state = 0;
        b.id = getId(accName);
        enqueueBirthCertificate(b); 
        return c;
    }  

    function approveBirthCerti(string memory accNameApprover) public returns(BirthCertificate memory c){
        require(isApprover(accNameApprover) == true, "Approver rights required");
        BirthCerti memory b = topBirthCertificate();
        c = approveBirthCertificate(b.id);
        dequeueBirthCertificate();
        return c;
    }

    function rejectBirthCerti(string memory accNameApprover) public returns(BirthCertificate memory c){
        require(isApprover(accNameApprover) == true, "Approver rights required");
        BirthCerti memory b = topBirthCertificate();
        c = rejectBirthCertificate(b.id);
        dequeueBirthCertificate();
        return c;
    }

    function getBirthCerti(string memory accName) public view returns(BirthCertificate memory){
        return getBirthCertificate(getId(accName));
    }

    function getCountPendingBirthCerti() public view returns(uint){
        return getCountOfPendingBirthCertificate();
    }

    
    // Aadhar Card functions
    // All cards will have to approved in FCFS order 
    
    function newAadharCard(string memory accName, string memory _name, string memory _number, string memory _ipfsHash, string memory _description) public returns(AadharCard memory c){
        c = newAadharCard(getId(accName),_name,_number,_ipfsHash,_description);        
        AadharCardQueue memory b;
        b.state = 0;
        b.id = getId(accName); 
        enqueueAadharCard(b);
        return c; 
    }  

    function setAadharCard(string memory accName, string memory _name, string memory _number, string memory _ipfsHash, string memory _description) public returns(AadharCard memory c){
        uint id = getId(accName);
        c = getAadharCard(accName);
        require(c.id == id && id != 0, "Aadhar card not found!");
        c = setAadharCard(id,_name,_number,_ipfsHash,_description);
        AadharCardQueue memory b;
        b.state = 0;
        b.id = getId(accName);
        enqueueAadharCard(b); 
        return c;
    }  

    function approveAadharCard(string memory accNameApprover) public returns(AadharCard memory c){
        require(isApprover(accNameApprover) == true, "Approver rights required");
        AadharCardQueue memory b = topAadharCard();
        c = approveAadharCard(b.id);
        dequeueAadharCard();
        return c;
    }

    function rejectAadharCard(string memory accNameApprover) public returns(AadharCard memory c){
        require(isApprover(accNameApprover) == true, "Approver rights required");
        AadharCardQueue memory b = topAadharCard();
        c = rejectAadharCard(b.id);
        dequeueAadharCard();
        return c;
    }

    function getAadharCard(string memory accName) public view returns(AadharCard memory){
        return getAadharCard(getId(accName));
    }

    function getCountPendingAadharCard() public view returns(uint){
        return getCountOfPendingAadharCard();
    }

    // Share Certificates functions

    function shareCerti(string memory accName, string memory viewerAccName, uint typeOfCerti, uint time) public returns(uint){
        return shareCertificate(accName, viewerAccName,typeOfCerti,time);
    }

    function checkIfSharedCerti(string memory accName, string memory viewerAccName, uint typeOfCerti) public view returns(bool){
        return checkSharedCertificate(accName,viewerAccName,typeOfCerti);
    } 

    // Passport Certificate functions
    // All certis will have to approved in FCFS order 
    
    function newPassportCerti(string memory accName, string memory _name, string memory _dob, string memory _ipfsHash, string memory _description) public returns(PassportCertificate memory c){
        c = newPassportCertificate(getId(accName),_name,_dob,_ipfsHash,_description);        
        PassportCerti memory b;
        b.state = 0;
        b.id = getId(accName); 
        enqueuePassportCertificate(b);
        return c; 
    }  

    function setPassportCerti(string memory accName, string memory _name, string memory _dob, string memory _ipfsHash, string memory _description) public returns(PassportCertificate memory c){
        uint id = getId(accName);
        c = getPassportCerti(accName);
        require(c.id == id && id != 0, "Passport Certificate not found!");
        c = setPassportCertificate(id,_name,_dob,_ipfsHash,_description);
        PassportCerti memory b;
        b.state = 0;
        b.id = getId(accName);
        enqueuePassportCertificate(b); 
        return c;
    }  

    function approvePassportCerti(string memory accNameApprover) public returns(PassportCertificate memory c){
        require(isApprover(accNameApprover) == true, "Approver rights required");
        PassportCerti memory b = topPassportCertificate();
        string memory accName = userId_user[b.id].accountName;
        require(checkIfSharedCerti(accName,accNameApprover,1) == true, "Share Birth Certificate with Approver!");
        require(checkIfSharedCerti(accName,accNameApprover,2) == true, "Share Aadhar Card with Approver!");
        c = approvePassportCertificate(b.id);
        dequeuePassportCertificate();
        return c;
    }

    function rejectPassportCerti(string memory accNameApprover) public returns(PassportCertificate memory c){
        require(isApprover(accNameApprover) == true, "Approver rights required");
        PassportCerti memory b = topPassportCertificate();
        c = rejectPassportCertificate(b.id);
        dequeuePassportCertificate();
        return c;
    }

    function getPassportCerti(string memory accName) public view returns(PassportCertificate memory){
        return getPassportCertificate(getId(accName));
    }

    function getCountPendingPassportCerti() public view returns(uint){
        return getCountOfPendingPassportCertificate();
    }

}