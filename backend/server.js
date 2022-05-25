// const express = require('express')
// const dotenv = require('dotenv')
// const connectDB = require('./config/db')
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import peopleRoutes from './routes/peopleRoutes.js'
import bodyParser from 'body-parser'


dotenv.config();
connectDB();
const app = express()

app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/api/v1/people', peopleRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log('Server running...'))