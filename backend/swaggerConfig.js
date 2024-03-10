const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Moderated Room API built with Express.js',
      version: '1.0.0',
      description: 'API Documentation for Moderated Room Application',
    },
    components: {
        securitySchemes: {
          'x-access-token': {
            type: 'apiKey',
            name: 'x-access-token',
            in: 'header',
          },
        },
      },
      security: [{'x-access-token': [] }], // Apply x-access-token security globally
    },
    apis: ['./routes/*.js'], // Path to the API routes files to be documented
  };

const specs = swaggerJsdoc(options);

module.exports = specs;
