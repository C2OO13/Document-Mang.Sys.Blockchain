// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./Login.sol";

contract ShareCertificateContract is Login{

    struct SharedCertis{
        uint typeOfCerti;// 1-Birth 2-Aadhar 3-Passport
        uint time; // days
        string timeOfSharing;
        string sharerAccName;
    }
    // accName => ShareCertis 
    mapping(string => SharedCertis[]) internal userHasAccessToCertis;

    constructor(){
        // lastId = 0;
    }

    function shareCertificate(string memory sharerAccName, string memory sharedToAccName, uint typeOfCerti, uint time, string memory timeOfSharing) public{
        uint userId = accountName_userId[sharerAccName];
        uint viewerId = accountName_userId[sharedToAccName];
        require(userId >= 1, "User not found");
        require(viewerId >= 1, "Viewer not found");
        require(userId != viewerId, "You can't share certis with yourself");
        SharedCertis memory b;
        b.sharerAccName = sharerAccName;
        b.timeOfSharing = timeOfSharing;
        b.time = time;
        b.typeOfCerti = typeOfCerti;
        userHasAccessToCertis[sharedToAccName].push(b);
    }

    function getSharedCertis(string memory accName) public view returns(SharedCertis[] memory b){
        b = userHasAccessToCertis[accName];
    }

}