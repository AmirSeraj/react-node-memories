import bcrypt from 'bcryptjs';
import User from "../mongodb/models/user.js";
import {generateToken} from "../utils.js";

const signUpUser = async (req, res) => {
    const {email, password, name, confirmPassword} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message: "User already exists!"});
        if (password !== confirmPassword) return res.status(400).json({message: "passwords do not match!"});

        const hashedPassword = await bcrypt.hashSync(password, 12);

        const result = await User.create({
            name,
            email,
            password: hashedPassword
        })

        // const user = new User({
        //     name,
        //     email,
        //     password: hashedPassword
        // })
        // const createdUser = await user.save();
        // const token = generateToken(createdUser);

        const token = generateToken(result);

        res.status(200).json({result, token});

    } catch (error) {
        res.status(500).json({message: "something went wrong!"})
    }
}

const signInUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if (!existingUser) return res.status(404).json({message: "User does not exist!"});

        const isPasswordCorrect = await bcrypt.compareSync(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials."});

        const token = generateToken(existingUser);

        res.status(200).json({result: existingUser, token})

    } catch (error) {
        res.status(500).json({message: 'something went wrong!'})
    }
}

export {
    signUpUser,
    signInUser
}