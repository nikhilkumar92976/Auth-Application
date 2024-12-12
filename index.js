const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

require('dotenv').config();

const Port = process.env.PORT || 4000;

// Import routes
const routes = require('./Routes/route');
app.use('/api/v1', routes);
app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
})

const dbConnect = require('./config/database');
dbConnect();

app.get('/', (req, res) =>{
    res.send('API is running');
})