const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');
const bodyParser = require('body-parser');

const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();
const port = 3000;

app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});