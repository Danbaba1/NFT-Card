const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Web3 = require('web3');
// const { Account } = require('web3-eth-accounts');

// const privateKey = process.env.MINT_SERVICE_PRIVATE_KEY; // Use environment variable
// const serviceAccount = new Account(privateKey);

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An error occurred!' });
  next(); // Pass control to default error handler (optional)
};

require('dotenv').config(); // Load environment variables from .env file

// Replace with your Base contract address
const contractAddress = "https://basescan.org/address/0x4200000000000000000000000000000000000006";

const app = express();
app.use(express.json());

const alchemyApiKey = process.env.ALCHEMY_API_KEY;
// Configure Web3 provider (replace with your provider details)
const web3Provider = new Web3.providers.HttpProvider(`https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`);
const web3 = new Web3(web3Provider);

// Get contract ABI (replace with your contract ABI)
const abi = require('./contractABI.json');

const contract = new web3.eth.Contract(abi, contractAddress);

app.post('/buy', async (req, res) => {
  try {
    const { amount, customerWallet } = req.body;

    // Create a Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      metadata: { customerWallet },
    });

    // Check if payment was successful
    if (paymentIntent.status === 'succeeded') {
      // Call function to mint NFT on successful payment
      await mintNFT(customerWallet);
      res.json({ message: 'NFT minted successfully!' });
    } else {
      res.status(400).json({ error: 'Payment failed!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred!' });
  }
});

async function mintNFT(customerWallet) {
  // Function to call the smart contract mint function
  try {
    const tx = await contract.methods.mintNFT(customerWallet).send({
      // from: serviceAccount.contractAddress, // Replace with your account address
      gas: 21000, // Adjust gas limit as needed
      // gasPrice: await web3.eth.getGasPrice(),
    });
    console.log('Transaction hash:', tx.transactionHash);
  } catch (error) {
    console.error('Error minting NFT:', error);
  }
}

app.use(errorHandler);

app.listen(3000, () => console.log('Server listening on port 3000'));
