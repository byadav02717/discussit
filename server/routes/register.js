var express = require('express');
var app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10

var database = require('../config/database');



app.post('/register', (req,res)=>{
    const Email=req.body.Email;
    const Password=req.body.Password;
    //console.log(req.body.Email);
    let sql = `INSERT INTO users (Email, Password) VALUES (?,?)`;
    bcrypt.hash(Password,saltRounds, (err, hash)=>{
        if(err){
            console.log(err);
        }
        
        database.query(
            sql,[Email,hash],
           
            (err,result)=>{
                if(err){
                    console.log(err);
                    res.send(false);
                }
                else{
                    console.log(result)
                    res.send(true);
    
                }
               
            }
    
        );

    }) 
});


app.post('/login',async(req,res)=>{
    const Email=req.body.Email;
    const Password=req.body.Password;
     //console.log(req.body.Email);
     let sql = `SELECT * FROM users WHERE Email = ?`;
     
 
     database.query(
        sql,Email,
    
        (err,result)=>{
            if(err){
                res.send({err:err});
            }
            if(result.length >0){
            bcrypt.compare(Password, result[0].Password,(error, response)=>{
                if(response){
                    console.log(response)
                    res.send(result);
                    console.log("username and password match")

                }
                else{
                    //res.send(false);
                    res.send({message: "Wrong username and password combination"});
                    console.log("Wrong username and password combination");
                }
            })
            }
            else{
                //res.send(false);
                res.send({message:"User doesn't exist"});                

            }
        
        }
 
     );
 });



module.exports = app;