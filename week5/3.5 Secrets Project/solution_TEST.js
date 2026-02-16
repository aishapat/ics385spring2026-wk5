import express from "express"; //import express framework
import bodyParser from "body-parser"; //import body-parser to read form data
import { dirname } from "path"; //import path tools
import { fileURLToPath } from "url"; //import URL tools
const __dirname = dirname(fileURLToPath(import.meta.url)); // get current folder path

const app = express(); // start the web server
const port = 3000; // set port number

var userIsAuthorised = false; // track if user entered correct password

app.use(bodyParser.urlencoded({ extended: true })); // let the server read form data sent by the user

function passwordCheck(req, res, next) {
  //check the password everytime someone sends a request
  const password = req.body["password"]; // get password from form
  if (password === "ILoveProgramming") {
    // if password is correct
    userIsAuthorised = true; // mark user as authorized
  }
  next(); // go to next part of the code
}
app.use(passwordCheck); // run password check for all request

// show the main page with password form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// handle form submission
app.post("/check", (req, res) => {
  if (userIsAuthorised) {
    //if user entered correct password
    res.sendFile(__dirname + "/public/secret.html"); // show secret page
  } else {
    res.sendFile(__dirname + "/public/index.html"); // go back to main page
  }
});

// start the server and wait for users
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
