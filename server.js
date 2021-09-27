// Setup empty JS object to act as endpoint for all routes
projectData = {};

//depandancies
const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require ('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port =4444;

const Server = app.listen(port,() => {
    console.log (`server is running: ${port}`);
})