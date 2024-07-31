const express = require('express')
const connect = require('./database/connection')
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT || 8084 ;

// create express instance
const app = express();
app.use(express.json());

app.use(cors({
    origin:"*",
    // Change origin to client URL on Production
    methods:['GET','POST','UPDATE','DELETE','PUT','PATCH']
}))

// database connection
connect();

// routes
app.use('/api', require('./router/router'));
app.use('/api',  require('./router/presence'));
app.use('/api',  require('./router/conge'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
