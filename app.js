const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('./swagger.js'); // Assuming your config file location

const app = express();

// ... other middleware setup ...

// Serve the Swagger documentation JSON
app.get('/api-docs.json', (req, res) => {
  res.json(swaggerJsdoc);
});

// Serve the Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));

// ... your API routes ...

app.listen(3000, () => console.log('Server listening on port 3000'));
