// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract NotificationContract{

    struct Notification{
        string accountName;
        string message;
        string redirectLink;
    }   

    mapping(string => Notification[]) internal userNotifications;
    
    constructor(){
    }

    function addNotification(string memory accountName, string memory message, string memory redirectLink) public {
        Notification memory n;
        n.accountName = accountName;
        n.message = message;
        n.redirectLink = redirectLink;
        userNotifications[accountName].push(n);
    }

    function getUserNotifications(string memory accountName) public view returns(Notification[] memory n){
        n = userNotifications[accountName];
    }
}