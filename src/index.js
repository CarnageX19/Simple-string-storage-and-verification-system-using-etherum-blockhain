// index.js

const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "issuer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "verified",
          "type": "bool"
        }
      ],
      "name": "CredentialAdded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "credentials",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "issuer",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "verified",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addCredential",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_entity",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "verifyCredential",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
          {
              "internalType": "address",
              "name": "_entity",
              "type": "address"
          },
          {
              "internalType": "string",
              "name": "_name",
              "type": "string"
          }
      ],
      "name": "credentialExists",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_entity",
              "type": "address"
          },
          {
              "internalType": "string",
              "name": "_name",
              "type": "string"
          }
      ],
      "name": "getCredentialByName",
      "outputs": [
          {
              "internalType": "string",
              "name": "name",
              "type": "string"
          },
          {
              "internalType": "address",
              "name": "issuer",
              "type": "address"
          },
          {
              "internalType": "bool",
              "name": "verified",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
  },
  ];


  document.addEventListener("DOMContentLoaded", async () => {
    // Initialize web3
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await
   
  window.ethereum.enable();
    } else
   
  if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.error("No web3 provider detected. Please install MetaMask or use a web3-enabled browser.");
      return;
    }
  
    // Get the current Ethereum account
    const accounts = await window.web3.eth.getAccounts();
    const currentAccount = accounts[0];
  
    // Load the smart contract
    const contractAddress = "0xb8De3cB23806ebA1c776b89A0aDA93857ABc97dE"; // Use your actual contract address
    const credentialVerificationContract = new window.web3.eth.Contract(abi, contractAddress);
  
    // Display existing credentials
    //displayCredentials();
  
    // Handle the form submission to add a new credential
    document.getElementById("addCredentialForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      const credentialName = document.getElementById("credentialName").value;
  
      // Add the new credential to the smart contract
      await credentialVerificationContract.methods.addCredential(credentialName).send({ from: currentAccount });
  
      // Display updated credentials
      //displayCredentials();
    });
    
    document.getElementById("checkCredentialForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      const credentialNameToCheck = document.getElementById("credentialToCheck").value;
  
      // Check if the specified credential exists and get its details
      try {
          const credentialExists = await credentialVerificationContract.methods.credentialExists(currentAccount, credentialNameToCheck).call();
          if (credentialExists) {
              // Credential exists, display its details
              const credentialDetails = await credentialVerificationContract.methods.getCredentialByName(currentAccount, credentialNameToCheck).call();
              alert(`${credentialDetails[0]} - Verified: ${credentialDetails[2]}`);
          } else {
              // Credential does not exist
              alert(`Credential with name "${credentialNameToCheck}" not found.`);
          }
      } catch (error) {
          console.error("Error checking credential:", error);
      }
  });


    // Function to display credentials
// Function to display credentials 
      async function displayCredentials() {
        const credentialsList = document.getElementById("credentialsList");
        credentialsList.innerHTML = "";

        // Get the number of credentials for the current account
        const credentialCount = 10; // Replace with the actual call to get credential count

        // Display details of each credential
        for (let i = 0; i < credentialCount; i++) {
            try {
                const credential = await credentialVerificationContract.methods.credentials(currentAccount, i).call();
                credentialsList.innerHTML += `<div>${credential.name} - Verified: ${credential.verified}</div>`;
            } catch (error) {
                console.error("Error fetching credential:", error);
            }
        }
      }
      
  });
