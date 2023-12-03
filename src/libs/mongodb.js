import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)
        console.log('connect to mongo');
    } catch (error) {
        console.log('not connected to mongo', error);
    }
}

export default connectMongoDB;