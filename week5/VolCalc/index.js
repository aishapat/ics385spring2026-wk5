//jshint esversion:6

//Import express and body-parser
const express = require("express");
const bodyParser = require("body-parser");

//create an Express app
const app = express();

//Use body-parser to parse form data
app.use(bodyParser.urlencoded({extended: true}));

//Serve the HTML page when user visits / VolCalc
app.get("/VolCalc", function(req, res){
    res.sendFile(__dirname + "/VolCalculator.html");
});

// Handle the form submission
app.post("/VolCalc", function(req, res){

// Get radius and height from form and convert to float numbers
const radius = parseFloat(req.body.radius);
const height = parseFloat(req.body.height);

// Calculate volume using PI * r^2 * h
const volume = Math.PI * Math.pow(radius, 2) * height;

//Send back the result rounded to 2 decimal places
res.send("The volume of the cylinder is " + volume.toFixed(2));
});

// Start server in port 3000
app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

