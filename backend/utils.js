import jwt from "jsonwebtoken";

export const generateToken = (createdUser) => {
    return jwt.sign({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
    }, process.env.JWT_SECRET || 'somethingSecret',{expiresIn: "1h"})
}