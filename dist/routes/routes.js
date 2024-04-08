"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logging_1 = require("../controllers/logging");
const router = (0, express_1.Router)();
//Get Account info
//  Must be logged in
//Put Account info
// Post sign up
router.post("/signup", logging_1.postSignup);
//Delete account
//Post Login
//Logout
//Get quote
//Post Buy
//Post sell
//Get user balance
