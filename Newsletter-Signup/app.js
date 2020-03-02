const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
require('dotenv').config();

const app = express();

app.use(express.static("public")); //Folder for static files
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    console.log(__dirname);
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    //Using bodyparser to extract the posted form data;
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    var data = { // JSON for subscribing
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    //List ID = 7ac337ea70
    const url = "https://" + process.env.API_SERVER + ".api.mailchimp.com/3.0/lists/7ac337ea70";

    const options = {
        method: "POST",
        auth: "harry:" + process.env.API_KEY
    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {

        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000.");
});