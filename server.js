const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const cors=require('cors');
const bodyparser=require('body-parser');
const PORT=5001;
const SECRET_KEY = "your_secret_key";
const renderUser= require('../Backend/routes/renderUser');

app.use(cors());
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded form data

app.use('/user',renderUser);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

