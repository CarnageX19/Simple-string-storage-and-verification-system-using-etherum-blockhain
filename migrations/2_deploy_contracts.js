

const CredentialVerification = artifacts.require("CredentialVerification");

module.exports = function (deployer) {
  deployer.deploy(CredentialVerification);
};
