import express from 'express'
import { config } from 'dotenv'
import { connectDB } from './configs/connectDB.js'
import cors from 'cors'
import { corsOptions } from './configs/corsOptions.js'
import startupRouter from './routes/startupRouter.js'
import { reviewRouter } from './routes/reviewRouter.js'
import { insertStartups } from './controllers/startupController.js'


  

//for the .env file to be used in the project
config()

//initializing the app with express
const app = express()

//connecting to the database
connectDB()

//when u first run the server uncomment this function to populate your database with this data in the data.js file in the data directory
// insertStartups()

//middleware
app.use(cors(corsOptions))
app.use(express.json())

//api for get,post,put,and delete for the startup
app.use('/api/startup',startupRouter)
//api for get,post,patch and delete for reviews
app.use('/api/reviews',reviewRouter)


app.listen(process.env.PORT,() => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})