// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;

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

// GET endpoint to get the project data
app.get('/projectData', function (req, res) {
    res.json(projectData);
});

app.post('/projectData', function (req, res) {
    projectData = req.body;
    res.json({
        "success": true,
    });
});

// Setup Server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));