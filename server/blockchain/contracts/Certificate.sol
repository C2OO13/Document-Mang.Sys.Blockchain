// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
contract InstitutionCertificates {
    address public contractOwner;
    uint public lastID;
    
    struct Certificate {
        address sendToAccount;
        string ipfsHash;
        string description;
        string active;
    }

    mapping (uint => Certificate) certificates;
    uint[] public certificateAccounts;
    
    constructor(){
        contractOwner = msg.sender;
    }

    function newCertificate(address _sendToAccount, string memory _ipfsHash, string memory _description) public {
        if (msg.sender != contractOwner) { revert(); }
        lastID = lastID + 1;
        Certificate storage l_certificate;
        l_certificate = certificates[lastID];
        l_certificate.sendToAccount = _sendToAccount;
        l_certificate.ipfsHash = _ipfsHash;
        l_certificate.description = _description;
        l_certificate.active = "true";
        certificateAccounts.push(lastID);
    }

    function setCertificate(uint _ID, address _sendToAccount, string memory _ipfsHash, string memory _description) public {
        if (msg.sender != contractOwner) { revert(); }
        Certificate storage l_certificate;
        l_certificate = certificates[_ID];
        l_certificate.sendToAccount = _sendToAccount;
        l_certificate.ipfsHash = _ipfsHash;
        l_certificate.description = _description;
    }
    
    function setActive(uint _ID, string memory _active) public {
        if (msg.sender != contractOwner) { revert(); }
        Certificate storage l_certificate;
        l_certificate = certificates[_ID];
        l_certificate.active = _active;
    }
    
    function getCertificate(uint _ID) view public returns (address, string memory, string memory, string memory) {
        return (certificates[_ID].sendToAccount,
            certificates[_ID].ipfsHash,
            certificates[_ID].description,
            certificates[_ID].active);
    }
}