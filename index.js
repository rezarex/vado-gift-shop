const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000
const connectDB = require('./config/connect')
const { notFound, errorHandler } = require("./middlewares/errorHandler")
const authRoute = require('./routes/authRoute')
//my new update


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cookieParser())

app.use('/api/v1/user', authRoute)
app.use(notFound);
app.use(errorHandler) //was app.request(errorHandler)...in case anything goes wrong


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`server is live on PORT ${PORT}..`))
    } catch (error) {
        console.log(error)
    }
}

start()