import { Router } from "express";
import { postSignup, postLogin } from "../controllers/logging";
import { getQuote } from "../controllers/quoting";
import { postBuy } from "../controllers/trading";
import isAuth from "../util/isAuth";

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
router.get("/quote/:ticker", getQuote);

//Post Buy
router.post("/buy", isAuth, postBuy);

//Post sell

//Get user balance

export default router;
