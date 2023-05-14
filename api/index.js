const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth.js')
const userRoute = require('./routes/user.js')
const cors = require('cors')



dotenv.config()
app.use(express.json())
app.use(cors())
app.use('/api/auth/', authRoute)
app.use('/api/user/', userRoute)


const StartServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
       
        console.log("connected")
        app.listen(8000, ()=>{
            console.log("Backend up and running!")
        })
    } catch (error) {
        
    }
}
StartServer()
