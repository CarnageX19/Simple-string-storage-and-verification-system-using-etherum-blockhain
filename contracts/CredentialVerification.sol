// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract CredentialVerification {
    event CredentialAdded(string name, address issuer, bool verified);

    struct Credential {
        string name;
        address issuer;
        bool verified;
    }

    mapping(address => Credential[]) public credentials;

    // Function to check if a credential with a specific name exists
    function credentialExists(address _entity, string memory _name) public view returns (bool) {
        for (uint256 i = 0; i < credentials[_entity].length; i++) {
            if (keccak256(bytes(credentials[_entity][i].name)) == keccak256(bytes(_name))) {
                return true;
            }
        }
        return false;
    }

    // Function to get a credential by name
    function getCredentialByName(address _entity, string memory _name) public view returns (string memory, address, bool) {
        for (uint256 i = 0; i < credentials[_entity].length; i++) {
            if (keccak256(bytes(credentials[_entity][i].name)) == keccak256(bytes(_name))) {
                return (credentials[_entity][i].name, credentials[_entity][i].issuer, credentials[_entity][i].verified);
            }
        }
        revert("Credential not found");
    }


    function addCredential(string memory _name) public {
        Credential memory newCredential = Credential(_name, msg.sender, true);
        credentials[msg.sender].push(newCredential);
        emit CredentialAdded(_name, msg.sender, newCredential.verified);
    }

    function verifyCredential(address _entity, uint256 _index) public {
        require(msg.sender == credentials[_entity][_index].issuer, "Only the issuer can verify credentials");
        credentials[_entity][_index].verified = true;
    }

    
}
