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

    function login(string memory name, string memory pwd) public view returns(bool){
        uint id = openLogin(name, pwd);
        if(id>0){
            return true;
        }
        return false;
    } 

    function registerApplicant(string memory _accountName, string memory _name, string memory _password) public {
        signUpApplicant(_accountName,_name,_password);
    }

    function registerApprover(string memory _accNameAdmin, string memory _passwordAdmin, string memory _accountName, string memory _name, string memory _password) public {
        bool check = login(_accNameAdmin,_passwordAdmin);
        if(!check) return;
        User memory u = getUser(_accNameAdmin);
        require(isAdmin(u.accountName) == true, "Admin rights required");
        signUpApprover(_accountName,_name,_password);   
    }

    function registerAdmin(string memory _accountName, string memory _name, string memory _password) public isOwner {
        signUpAdmin(_accountName,_name,_password);    
    }

    function changePassword(string memory _accountName, string memory _password, string memory _newPassword) public{
        changePwd(_accountName,_password,_newPassword);
    }

    // Birth Certificate functions
    // All certis will have to approved in FCFS order 
    
    function newBirthCerti(string memory accName, string memory _name, string memory _dob, string memory _ipfsHash, string memory _description) public {
        newBirthCertificate(getId(accName),_name,_dob,_ipfsHash,_description);        
        BirthCerti memory b;
        b.state = 0;
        b.id = getId(accName); 
        enqueueBirthCertificate(b);
        return; 
    }  

    function setBirthCerti(string memory accName, string memory _name, string memory _dob, string memory _ipfsHash, string memory _description) public {
        uint id = getId(accName);
        BirthCertificate memory c = getBirthCerti(accName);
        require(c.id == id && id != 0, "Birth Certificate not found!");
        c = setBirthCertificate(id,_name,_dob,_ipfsHash,_description);
        BirthCerti memory b;
        b.state = 0;
        b.id = getId(accName);
        enqueueBirthCertificate(b); 
        return;
    }  

    function approveBirthCerti(string memory accNameApprover) public {
        require(isApprover(accNameApprover) == true, "Approver rights required");
        BirthCerti memory b = topBirthCertificate();
        approveBirthCertificate(b.id);
        dequeueBirthCertificate();
        return;
    }

    function topBirthCerti() public view returns (BirthCertificate memory data) {
        BirthCerti memory b = topBirthCertificate();
        data = getBirthCertificate(b.id);
    }

    function rejectBirthCerti(string memory accNameApprover) public {
        require(isApprover(accNameApprover) == true, "Approver rights required");
        BirthCerti memory b = topBirthCertificate();
        rejectBirthCertificate(b.id);
        dequeueBirthCertificate();
        return;
    }

    function getBirthCerti(string memory accName) public view returns(BirthCertificate memory){
        return getBirthCertificate(getId(accName));
    }

    function getCountPendingBirthCerti() public view returns(uint){
        return getCountOfPendingBirthCertificate();
    }

    
    // Aadhar Card functions
    // All cards will have to approved in FCFS order 
    
    function newAadharCard(string memory accName, string memory _name, string memory _number, string memory _ipfsHash, string memory _description) public {
        newAadharCard(getId(accName),_name,_number,_ipfsHash,_description);        
        AadharCardQueue memory b;
        b.state = 0;
        b.id = getId(accName); 
        enqueueAadharCard(b);
        return; 
    }  

    function setAadharCard(string memory accName, string memory _name, string memory _number, string memory _ipfsHash, string memory _description) public {
        uint id = getId(accName);
        AadharCard memory c = getAadharCard(accName);
        require(c.id == id && id != 0, "Aadhar card not found!");
        c = setAadharCard(id,_name,_number,_ipfsHash,_description);
        AadharCardQueue memory b;
        b.state = 0;
        b.id = getId(accName);
        enqueueAadharCard(b); 
        return;
    }  

    function approveAadharCard(string memory accNameApprover) public {
        require(isApprover(accNameApprover) == true, "Approver rights required");
        AadharCardQueue memory b = topAadharCard();
        approveAadharCard(b.id);
        dequeueAadharCard();
        return ;
    }

    function topAadharCerti() public view returns (AadharCard memory data) {
        AadharCardQueue memory b = topAadharCard();
        data = getAadharCard(b.id);
    }

    function rejectAadharCard(string memory accNameApprover) public {
        require(isApprover(accNameApprover) == true, "Approver rights required");
        AadharCardQueue memory b = topAadharCard();
        rejectAadharCard(b.id);
        dequeueAadharCard();
        return ;
    }

    function getAadharCard(string memory accName) public view returns(AadharCard memory){
        return getAadharCard(getId(accName));
    }

    function getCountPendingAadharCard() public view returns(uint){
        return getCountOfPendingAadharCard();
    }

    // Share Certificates functions

    function shareCerti(string memory accName, string memory viewerAccName, uint typeOfCerti, uint time) public {
        shareCertificate(accName, viewerAccName,typeOfCerti,time);
    }

    function checkIfSharedCerti(string memory accName, string memory viewerAccName, uint typeOfCerti) public view returns(bool){
        return checkSharedCertificate(accName,viewerAccName,typeOfCerti);
    } 

    // Passport Certificate functions
    // All certis will have to approved in FCFS order 
    
    function newPassportCerti(string memory accName, string memory _name, string memory _dob, string memory _ipfsHash, string memory _description) public {
        newPassportCertificate(getId(accName),_name,_dob,_ipfsHash,_description);        
        PassportCerti memory b;
        b.state = 0;
        b.id = getId(accName); 
        enqueuePassportCertificate(b);
        return; 
    }  

    function setPassportCerti(string memory accName, string memory _name, string memory _dob, string memory _ipfsHash, string memory _description) public {
        uint id = getId(accName);
        PassportCertificate memory c = getPassportCerti(accName);
        require(c.id == id && id != 0, "Passport Certificate not found!");
        c = setPassportCertificate(id,_name,_dob,_ipfsHash,_description);
        PassportCerti memory b;
        b.state = 0;
        b.id = getId(accName);
        enqueuePassportCertificate(b); 
        return;
    }  

    function approvePassportCerti(string memory accNameApprover) public{
        require(isApprover(accNameApprover) == true, "Approver rights required");
        PassportCerti memory b = topPassportCertificate();
        string memory accName = userId_user[b.id].accountName;
        require(checkIfSharedCerti(accName,accNameApprover,1) == true, "Share Birth Certificate with Approver!");
        require(checkIfSharedCerti(accName,accNameApprover,2) == true, "Share Aadhar Card with Approver!");
        approvePassportCertificate(b.id);
        dequeuePassportCertificate();
        return;
    }

    function topPassportCerti() public view returns (PassportCertificate memory data) {
        PassportCerti memory b = topPassportCertificate();
        data = getPassportCertificate(b.id);
    }

    function rejectPassportCerti(string memory accNameApprover) public {
        require(isApprover(accNameApprover) == true, "Approver rights required");
        PassportCerti memory b = topPassportCertificate();
        rejectPassportCertificate(b.id);
        dequeuePassportCertificate();
        return;
    }

    function getPassportCerti(string memory accName) public view returns(PassportCertificate memory){
        return getPassportCertificate(getId(accName));
    }

    function getCountPendingPassportCerti() public view returns(uint){
        return getCountOfPendingPassportCertificate();
    }

}