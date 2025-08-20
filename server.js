const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8080;

//function to help read/write the database
function LoadmyData() {
    return JSON.parse(fs.readFileSync("database.json", "utf8"));
}

function SavemyData(data) {
    fs.writeFileSync("database.json", JSON.stringify(data, null, 2));
}

//ShowMySignUp
app.get("/signup",(req, res) => {
    const { referrer, source } = req.query;
    const database = LoadmyData();

    if (referrer || source) {
        // uuidv4/uuid creates a unique session id for the visitor/user
        const sessionid = uuidv4();
    };

    database.pendingAttributions[sessionid] =  {
        referrer: referrer || "unknown",
        source: source || "unknown",
        arrivedat: new Date(),
    };

    SavemyData(database);
    // store session id in cookie for later registration.
    // calculation 1000ms * 60 = 1min, *60 = 1hour, *24 = 1day, *30 = 30days
    res.cookie("session_id", sessionid, { maxage: 1000 * 60 * 60 * 24 * 30 });
})