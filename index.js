const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
const barkRoute = require('./barkRoute');

app.use(cors())
app.use(morgan("common"))
app.use(express.json())

app.use("/", barkRoute);

const port = process.env.PORT || 9090;
app.listen(port, () => {
    console.log(`Connected to server on port: ${port}`)
})