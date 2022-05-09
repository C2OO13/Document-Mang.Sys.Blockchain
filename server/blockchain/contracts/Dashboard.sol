// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "./Login.sol";
import "./NotificationContract.sol";
import "./BirthCertiContract.sol";
import "./AadharCardContract.sol";
import "./ShareCertificateContract.sol";
import "./PassportCertiContract.sol";

contract Dashboard is Login, BirthCertiContract, AadharCardContract, ShareCertificateContract, PassportCertiContract, NotificationContract{

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

    // function getApprovers() public view returns(User[] memory u){}
    // function getAdmins() public view returns(User[] memory u){}
    // function registerApplicant(string memory _accountName, string memory _name, string memory _password) public returns(uint) {}
    // function changePassword(string memory _accountName, string memory _password, string memory _newPassword) public returns(bool){}


    // ======> Notification functions <========
    // function addNotification(string memory accountName, string memory message, string memory redirectLink) public {}
    // function getUserNotifications(string memory accountName) public view returns(Notification[] memory n) {}

    // ======>  Share Certificates functions <========
    // function shareCertificate(string memory sharerAccName, string memory sharedToAccName, uint typeOfCerti, uint time, string memory timeOfSharing) public{}
    // function getSharedCertis(string memory accName) public view returns(SharedCertis[] memory b){}

    // ======>  Birth Certificate functions <========
    // function getCountOfPendingBirthCertificate() public view returns(uint){}
    // function newBirthCerti(string memory accName, string memory _name, string memory _dob, string memory _ipfsHash, string memory _description) public {}
    // function setBirthCertificate(string memory accName, string memory _name, string memory _dob, string memory _ipfsHash, string memory _description) public {}
    // function approveBirthCertificate(string memory accName) public {}
    // function rejectBirthCertificate(string memory accName) public {}
    // function getBirthCertificate(string memory accName) public view returns (BirthCertificate memory) {}
    // function getAllPendingBirthCertificates() public view returns(BirthCertificate[] memory b){}
    
    // ======>  Aadhar Card functions <========
    // function getCountOfPendingAadharCard() public view returns(uint){}
    // function newAadharCard(string memory accName, string memory _name, string memory _number, string memory _ipfsHash, string memory _description) public {}
    // function setAadharCard(string memory accName, string memory _name, string memory _number, string memory _ipfsHash, string memory _description) public{}
    // function approveAadharCard(string memory accName) public {}
    // function rejectAadharCard(string memory accName) public {}
    // function getAadharCard(string memory accName) public view returns (AadharCard memory) {}
    // function getAllPendingAadharCards() public view returns(AadharCard[] memory b){}

    // ======>  Passport Certificate functions <========
    // function getCountOfPendingPassportCertificate() internal view returns(uint){}
    // function newPassportCertificate(string memory accName, string memory _name, string memory _dob, string memory _ipfsHash, string memory _description) public {}
    // function setPassportCertificate(string memory accName, string memory _name, string memory _dob, string memory _ipfsHash, string memory _description) public {}
    // function approvePassportCertificate(string memory accName) public{}
    // function rejectPassportCertificate(string memory accName) public {}
    // function getPassportCertificate(string memory accName) public view returns (PassportCertificate memory) {}
    // function getAllPendingPassportCertis() public view returns(PassportCertificate[] memory b){}
    
}