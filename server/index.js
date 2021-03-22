var express = require('express');
var app = express();
var cors = require('cors');
var database = require('./config/database');
const { route } = require('./routes/register');
const bodyParser = require('body-parser');
var port = process.env. PORT || 3005;
var p =3000
//Connect to our databse
database.connect(function(error){
    if(!!error){
        console.log('Error');
        throw error
    }
    else{
        console.log('Connected')
    }
});

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));



// This is to allow our api  for cross-origin resource sharing
//app.use(cors());

// THi is to allow our api for parsing json
app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));






//Register routes in the main index.js
app.use('/',[
    require('./routes/register')
    //require('./routes/auth')
]);

// http://localhost:3005/tweets - GET, POST
// http://localhost:3005/tweets/user/:id - GET
// http://localhost:3005/tweets/:id - DELETE

// http://localhost:3005/authenticate - POST for login session



app.listen(port, ()=>{
    console.log(`Listening at http://localhost: ${port}`);
});