import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import peopleRoutes from './routes/peopleRoutes.js'

// Load env vars
dotenv.config();
// Connect to database
connectDB();
// Init app
const app = express()

app.use(express.json())
// Define routes
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/api/v1/people', peopleRoutes)

// Start server
const PROXY = process.env.PROXY || 5000;
app.listen(PROXY, console.log('Server running...' + PROXY))