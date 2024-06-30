const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  // Information about your API
  swaggerDefinition: {
    info: {
      title: 'NFT Purchase API',
      version: '1.0.0',
      description: 'API for purchasing NFTs with Stripe payment and smart contract minting',
    },
    servers: [{ url: 'http://localhost:3000' }], // Replace with your actual URL
  },
  // Paths (API endpoints) with their descriptions
  apis: ['./routes/*.js'], // Replace with your route file location (if separate)
};

const specs = swaggerJsdoc(options);

module.exports = specs;
