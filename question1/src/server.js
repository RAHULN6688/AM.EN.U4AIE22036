const express = require('express');
const routes = require('./routes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/numbers', routes);

app.listen(9876, () => console.log('Server on port 9876'));