const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "API - Sheet2Script",
        description: "Documentação da API "
    },
    servers: [
        {
            url: 'http://localhost:3000'
        }
    ],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./src/index.js');
});