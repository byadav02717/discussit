var mysql = require('mysql');

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "",
    database:"loginsys",
    


});

module.exports = con;