import express from 'express'
import { config } from 'dotenv'
import { connectDB } from './configs/connectDB.js'
import cors from 'cors'
import { corsOptions } from './configs/corsOptions.js'
import startupRouter from './routes/startupRouter.js'


//for the .env file to be used in the project
config()

const app = express()

//middleware
app.use(cors(corsOptions))
app.use(express.json())

//api for get,post,put,and delete for the startup
app.use('/api/startup',startupRouter)


app.listen(process.env.PORT,() => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})