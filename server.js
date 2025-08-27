const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 8080;

//middleware

app.use(bodyParser.urlencoded({ extended: true }));

// help to load/save to database.json

function LoadmyData() {
    return JSON.parse(fs.readFileSync("database.json", "utf8"));
}

function SavemyData(data) {
    fs.writeFileSync("database.json", JSON.stringify(data, null, 2));
}

//help to get the client's IP

function GetmyClientIP(req) {
    return(
        req.headers["x-forwarded-for"]?.split(",").shift() || 
        req.socket?.remoteAddress
    );
}

// the sign up page

app.get("/signup", (req, res) => {
    const { referrer, platform } = req.query;
    const database = LoadmyData();
    const clientIP = GetmyClientIP(req);

    // store info tied to ip
    if (referrer || platform) {
        database.pendingAttributions[clientIP] = {
            influencer: referrer || "unknown",
            source: platform || "unknown",
            arrivedAt: new Date(),
        };
        SavemyData(database);
    }

    // shows a simple signup page/form
    res.send(`
        <h1>Sign Up</h1>
        <form method="POST" action="/register">
            <input type="email" name="email" placeholder="Enter your email" required />
            <button type="submit">Register</button>
        </form>
    `);
});
