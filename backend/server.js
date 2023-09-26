import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from 'cors';
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();
app.use(cors());

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        // /connect to database
        connectDB(process.env.MONGODB_URL)
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

startServer();


// MONGODB_URL = mongodb+srv://amirseraj:amirseraj123@cluster0.cazephw.mongodb.net/

