const express = require('express');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');
const Web3 = require('web3');

// Replace with your Base contract address
const contractAddress = "YOUR_CONTRACT_ADDRESS";

const app = express();

// Configure Web3 provider (replace with your provider details)
const web3Provider = new Web3.providers.HttpProvider('YOUR_NODE_PROVIDER_URL');
const web3 = new Web3(web3Provider);

// Get contract ABI (replace with your contract ABI)
const abi = [
  // Your smart contract ABI goes here
];

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
      from: 'YOUR_ACCOUNT_ADDRESS', // Replace with your account address
      gas: 21000, // Adjust gas limit as needed
    });
    console.log('Transaction hash:', tx.transactionHash);
  } catch (error) {
    console.error('Error minting NFT:', error);
  }
}

app.listen(3000, () => console.log('Server listening on port 3000'));
