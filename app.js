const express = require('express');
const app = express();
const http = require('http').Server(app);
const PORT = process.env.PORT || 3131 ;
const dotenv = require("dotenv");
const MongoDB = require('./config/db');

//Load env vars
dotenv.config({path: './config/config.env'});

//Connect to database
MongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/main')(app)


app.listen(
    PORT,
    console.log(`Server is runing in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on('unhandleRejection', (err , promise) => {
    console.log(`Unhandled Rejection ${err.message}`);
    server.close(() => process.exit(1));
});