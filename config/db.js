const mongoose = require('mongoose');
// require('dotenv').config()
// const conn = process.env.HOST

// mongoose.connect(host, {
//     'useNewUrlParser': true,
//     'useUnifiedTopology': true
// })
//
// mongoose.set('useCreateIndex', true)

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.HOST, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true

    });
    console.log(`Connect to MongoDB:${conn.connection.host}`)
};

module.exports = connectDB;
