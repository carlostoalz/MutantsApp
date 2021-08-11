import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: 'variables.env' });

export const conectarBD = async () => {

    try {
        
        await mongoose.connect(process.env.BD_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log('BD Conectada');
    } catch(error) {
        console.log(error);
        process.exit(1); //
    }

};