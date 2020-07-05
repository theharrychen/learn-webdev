const express = require("express");

const app = express();

// defines what happens when someone makes a get request to home root
app.get("/", function (req, res) { 
    res.send("<h1>hello</h1>");
});

app.get("/contact", function(req, res) {
    res.send("Contact me at: bob@gmail.com");
});

app.get("/about", function(req, res) {
    res.send("My name is Harry and I like to run!");
});

app.get("/hobbies", function(req, res) {
    res.send("<ul><li>Soccer</li><li>Coding</li><li>Soda</li></ul>");
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
}); //listens to port 3000