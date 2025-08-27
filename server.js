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

