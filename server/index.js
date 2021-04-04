var express = require('express');

var cors = require('cors');
var database = require('./config/database');
const { route } = require('./routes/register');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
var app = express();
var port = process.env. PORT || 3005;



//Check Connection to our databse
database.connect(function(error){
    if(!!error){
        console.log('Error');
        throw error
    }
    else{
        console.log('Connected')
    }
});
app.use(express.json());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(cookieParser());

// const sessionStore = new MySQLStore({
//     expiration:(60*60*24),
//     endConnectionOnClose: false
// }, database);
// app.use(session({
//     key: "ASGF541G5DAS4G51A56SD1DGE654RG1A56S",
//     secret: "AKFDJGNOASG4ASD4F5G45AS4DD56G45AS4",
//     store: sessionStore,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: (60*60*24),
//         httpOnly: false
//     }

// }))



// This is to allow our api  for cross-origin resource sharing
//app.use(cors());

// THi is to allow our api for parsing json


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