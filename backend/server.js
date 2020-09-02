const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const productRoutes = require('./routes/productRoute') //new code

// Initializing express
const app = express()

// Body parser middleware
app.use(express.json())

// Cors middleware
app.use(cors())

//DB config
const MONGODB_URI= process.env.MONGODB_URI ||
require('./config').mongoDB_URI

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true  })

// Check Connection
let db = mongoose.connection;
db.once('open', ()=>{
   console.log('Database connected successfully')
})

// Check for DB Errors
db.on('error', (error)=>{
   console.log(error);
})

// Use Routes
app.use('/products', productRoutes)  //new code

// Define the PORT
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
   console.log(`Server listening on port ${PORT}`)
})