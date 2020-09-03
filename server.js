// We will declare all our dependencies here
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

//Declaring Port
const port = 8072;

//Initialize our app variable
const app = express();

//Middleware for CORS
app.use(cors());

//Middlewares for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



/*express.static is a built in middleware function to serve static files.
 We are telling express server public folder is the place to look for the static files
*/
app.use(express.static(path.join(__dirname, 'dist/angular-prototype')));


//Listen to port 3000
app.listen(port, () => {
	console.log(`Starting the server at port ${port}`);
});
app.get('/*', function(req,res) {
    
    res.sendFile(path.join(__dirname+'/dist/angular-prototype/index.html'));
    });