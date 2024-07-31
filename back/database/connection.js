const mongoose = require("mongoose");
require('dotenv').config();

const connect = async () => {
    try {
        // mongodb connection
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('MongoDB connected...'))
        .catch(err => console.log(err));

     } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connect;
