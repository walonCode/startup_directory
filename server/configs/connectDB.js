import mongoose from 'mongoose'

export const connectDB = async() => {
    console.log('MongoDB connection with retry')
    try{
        await mongoose.connect(process.env.DATABASE_URI,{});
        console.log('connected to MongoDB');
    }catch(error){
        console.error(error)
    }
}