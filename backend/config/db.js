import mongoose from 'mongoose'

const connectDB = async () => {
    const URI = process.env.MONGO_URI;
    console.log(URI);
    try {
        const conn = await mongoose.connect(URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useCreateIndex: true,
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB