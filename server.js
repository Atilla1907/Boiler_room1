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