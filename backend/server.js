// const express = require('express')
// const dotenv = require('dotenv')
// const connectDB = require('./config/db')
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import peopleRoutes from './routes/peopleRoutes.js'
import cors from 'cors';

const app = express()
dotenv.config();
connectDB();

app.use(express.json())

// Enable CORS for all routes
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/api/v1/people', peopleRoutes)
const PROXY = process.env.PROXY || 5000;
app.listen(PROXY, console.log('Server running...' + PROXY))