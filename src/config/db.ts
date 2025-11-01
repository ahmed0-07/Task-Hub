import mongoose from "mongoose"

export const connectDB = async () => {
    const uri = process.env.DB_CONNECTION_STRING

    try{
        await mongoose.connect(uri!)
        console.log('DB connected.....')
    }
    catch(error){
        console.log('db error')
    }
}