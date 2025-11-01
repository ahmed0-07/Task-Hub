import app from '../app.js';
import { connectDB } from './db.js';

const PORT = process.env.PORT;

const startServer = async () => {
    try{
        await connectDB()
        app.listen(PORT, () => {
            console.log('server running....')
        });
    }catch(error){
        console.log(error)
    }
}

export default startServer