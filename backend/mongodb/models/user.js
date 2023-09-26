import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false, required: true},
    // id: {type: String, unique: true}
}, {timestamps: true})

const User = mongoose.model('User', UserSchema);
export default User;