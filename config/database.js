const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL,)
   .then(()=>console.log("Connected to MongoDB"))
   .catch(err=>console.error("Error connecting to MongoDB", err));
}

module.exports = dbConnect;