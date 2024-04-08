import { Router } from "express";
import { postSignup, postLogin } from "../controllers/logging";

const router = Router();

//Get Account info
//  Must be logged in

//Put Account info

// Post sign up
router.post("/signup", postSignup);

//Delete account

//Post Login
router.post("/login", postLogin);
//Logout

//Get quote

//Post Buy

//Post sell

//Get user balance

export default router;
