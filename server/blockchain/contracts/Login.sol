// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Login {

    struct User{
        string name;
        string accountName;// unique
        string password;
        uint profile;// 1 - Applicant / 2 - Approver / 3 - Admin
        uint userId;
    }   

    uint private lastId;
    mapping(uint => User) internal userId_user;
    mapping(string => uint) internal accountName_userId;

    constructor(){
        lastId = 0;
    }

    function checkUniqueAccountName(string memory accountName) private view returns(bool){
        if(accountName_userId[accountName]>0) return true;
        return false;
    }

    function signUpApplicant(string memory _accountName, string memory _name, string memory _password) internal returns(uint) {
        require(checkUniqueAccountName(_accountName) == false, "Account Name already in use! Try another one");
        User memory u;
        lastId += 1;
        u.userId = lastId;
        u.name = _name;
        u.accountName = _accountName;
        u.profile = 1;
        u.password = _password;
        accountName_userId[_accountName] = lastId;
        userId_user[lastId] = u;
        return lastId;
    }

    function signUpApprover(string memory _accountName, string memory _name, string memory _password) internal returns(uint) {
        require(checkUniqueAccountName(_accountName) == false, "Account Name already in use! Try another one");
        User memory u;
        lastId += 1;
        u.userId = lastId;
        u.name = _name;
        u.accountName = _accountName;
        u.profile = 2;
        u.password = _password;
        accountName_userId[_accountName] = lastId;
        userId_user[lastId] = u;
        return lastId;
    }

    function signUpAdmin(string memory _accountName, string memory _name, string memory _password) internal returns(uint) {
        require(checkUniqueAccountName(_accountName) == false, "Account Name already in use! Try another one");
        User memory u;
        lastId += 1;
        u.userId = lastId;
        u.name = _name;
        u.accountName = _accountName;
        u.profile = 3;
        u.password = _password;
        accountName_userId[_accountName] = lastId;
        userId_user[lastId] = u;
        return lastId;
    }

    function openLogin(string memory _accountName, string memory _password) internal view returns (uint) {
        uint userId = accountName_userId[_accountName];
        User memory u = userId_user[userId];
        if (keccak256(bytes(u.password)) == keccak256(bytes(_password))) {
            return userId;
        }
        return 0;
    }

    function changePwd(string memory _accountName, string memory _password, string memory _newPassword) internal returns(bool){
        uint userId = accountName_userId[_accountName];
        User memory u = userId_user[userId];
        if (keccak256(bytes(u.password)) == keccak256(bytes(_password))) {
            userId_user[userId].password = _newPassword;
            return true;
        } 
        return false;
    }

}