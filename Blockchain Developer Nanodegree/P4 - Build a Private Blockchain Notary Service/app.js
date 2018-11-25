const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// to support JSON-encoded bodies
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

//importing route
let blockRoutes = require('./routes/blockRoute');
let validationRoutes = require('./routes/validationRoute');

//register the route
blockRoutes(app);
validationRoutes(app);

app.listen(8000, () => console.log('Private Blockchain Notary Service API is listening on port 8000!'));