import express from "express";
import {signUpUser, signInUser} from "../controllers/users.js";

const router = express.Router();

//http://localhost:5000/api/user

router.route('/signIn').post(signInUser);
router.route('/signUp').post(signUpUser);

export default router;