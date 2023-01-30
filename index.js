const express = require('express')
const app = express()
const detenv = require('dotenv').config()
const PORT = process.env.PORT || 4000
const connectDB = require('./config/connect')


//routes
app.use('/', (req, res)=>{
    res.send('Hi haters')
})


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`server is live on PORT ${PORT}..`))
    } catch (error) {
        console.log(error)
    }
}

start()