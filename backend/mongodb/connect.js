import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery',true);
    mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true})
        .then(() => console.log('MongoDB connected!'))
        .catch((error) => {
            console.log(error)
        })
}

export default connectDB;