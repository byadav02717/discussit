var mysql = require('mysql');

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "password",
    database:"discussit",
    


});

module.exports = con;