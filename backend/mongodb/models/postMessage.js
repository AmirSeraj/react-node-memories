import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    name: {type: String, required: true},
    creator: {type: String, required: true},
    tags: {type: [String], required: true},
    selectedFile: {type: String, required: true},
    likes: {type: [String], default: []},
    comments: {type: [String], default: []},
    createdAt: {type: Date, default: new Date()}
})

const PostMessage = mongoose.model('PostMessage', postSchema)
export default PostMessage;