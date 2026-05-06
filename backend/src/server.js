/**
 * @fileoverview Shadesmar API server entrypoint
 * 
 * 
 */

// Main setup
const express = require("express");
const app = express();

// ENV variables
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const SESSION_KEY = process.env.SESSION_KEY;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

// Imports
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");

const accounts = require("/accounts.js");

// Start server

if (typeof require !== 'undefined' && require.main === module) {
   main();
}

// Constants
// - Values
// - Schemas

// Values
const hashPassword = async function (text) {
    return await bcrypt.hash(text, SALT_ROUNDS);
};
const SALT_ROUNDS = 10;


// Schemas
const SESSION_SCHEMA = {
    secret: SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}

main();

// Middleware
function authenticate(req, res, next) {
    console.log("Attempting authentication");
    console.log("Session:", req.session);
    console.log("User:", req.session.user);

    if (!(req.session && req.session.user)) {
        res.redirect("login.html");
        return;
    }
    next();
}

function main() {
    // Setup
    app.use(session(SESSION_SCHEMA));

    // Start
    app.use(express.urlencoded({ extended: true }));

    // User Login
    app.post("/login", async (req, res) => {
        console.log("Logging user in");

        const { currentUser, passwordAttempt } = req.body;
        const user = VALID_USERS.find(user => user.username == currentUser);
        console.log("User Logging In:", currentUser);
        console.log("User Found:", user?.username);
        if (!user) {
            console.log("Username not found.");
            res.status(401).send("Username not found.");
            return;
        }
        passwordSame = await bcrypt.compare(passwordAttempt, user.password);
        console.log("Password Attempt:", passwordAttempt);
        console.log("User Password:", user.password);
        if (passwordSame) {
            console.log("Login successful");
            req.session.user = { username: user.username };

            res.redirect("/home");
            return;
        } else {
            console.log("Password is incorrect.");
            res.status(401).send("Username or password is incorrect.");
        }
    });

    /*
        Auth Protected Pages
    */
    app.use(authenticate);
    app.get("/home", (req, res) => {
        res.send("Going home");
    });

    // Start listening
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

