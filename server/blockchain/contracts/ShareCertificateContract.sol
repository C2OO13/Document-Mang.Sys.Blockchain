// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./Login.sol";

contract ShareCertificateContract is Login{

    mapping(uint => mapping(uint => mapping(uint => uint))) internal shareCertis; // userId => viewerId => whichCerti => time
    // 1-Birth 2-Aadhar 

    constructor(){
        // lastId = 0;
    }

    function shareCertificate(string memory accountName, string memory viewerAccountName, uint typeOfCerti, uint time) internal returns(uint){
        uint userId = accountName_userId[accountName];
        uint viewerId = accountName_userId[viewerAccountName];
        require(userId >= 1, "User not found");
        require(viewerId >= 1, "Viewer not found");
        require(userId != viewerId, "You can't share certis with yourself");
        shareCertis[userId][viewerId][typeOfCerti] = ((time * 1 days) + block.timestamp);
        return shareCertis[userId][viewerId][typeOfCerti];
    }

    function checkSharedCertificate(string memory accountName, string memory viewerAccountName, uint whichCerti) internal view returns(bool){
        uint userId = accountName_userId[accountName];
        uint viewerId = accountName_userId[viewerAccountName];
        require(userId >= 1, "User not found");
        require(viewerId >= 1, "Viewer not found");
        require(userId != viewerId, "You can view your certis in Dashboard");
        if(block.timestamp >= shareCertis[userId][viewerId][whichCerti]) return false;
        return true;
    }


}