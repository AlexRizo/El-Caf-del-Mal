import mongoose from "mongoose";

const dbConection = async() => {
    try {
        mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true, // <-- no longer necessary
            useUnifiedTopology: true // <-- no longer necessary
        });

        console.log('DB status: ok');
    } catch (error) {
        throw new Error('Error al conectar con la base de datos; ' + error);
    }
}

export {
    dbConection,
}