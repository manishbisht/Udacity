const bodyParser = require('body-parser')
const express = require('express');
const app = express();

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
// to support JSON-encoded bodies
app.use(bodyParser.json());

//importing route
let routes = require('./routes/blockRoute');
//register the route
routes(app);

app.listen(8000, () => console.log('Private Blockchain API is listening on port 8000!'));
