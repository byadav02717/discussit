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
                    console.log({id:result[0].id, Email:result[0].Email})
                    res.send({id:result[0].id, Email:result[0].Email});
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

 app.post('/creategroup', (req,res)=>{
    const GName=req.body.GName;
    const Gdesc=req.body.Gdesc;
    const id = req.body.id;
    //console.log(req.body.Email);
    let sql = `INSERT INTO groups1 (GName, Gdesc, id) VALUES (?,?,?)`;
   
        database.query(
            sql,[GName,Gdesc,id],
           
            (err,result)=>{
                if(err){
                    console.log(err);
                    res.send({message:"Group Not Created"});
                }
                else{
                    console.log(result)
                    res.send({message:"Group Created"});
    
                }
               
            }
    
        );

    
});

app.post('/question', (req,res)=>{
    const id = req.body.id;
    const GId = req.body.GId;
    const Question = req.body.Question;
    
    //console.log(req.body.Email);
    let sql = `INSERT INTO questions(id, GId, Question) VALUES (?,?,?)`;
   
        database.query(
            sql,[id, GId, Question],
           
            (err,result)=>{
                if(err){
                    console.log(err);
                    res.send({message:"Question Not posted"});
                }
                else{
                    console.log(result)
                    res.send({message:"Question Posted"});
    
                }
               
            }
    
        );

    
});

app.post('/answer', (req,res)=>{
    const QId = req.body.QId;
    const id = req.body.id;
    const Answer = req.body.Answer;
    
    let sql = `INSERT INTO answers(QId, id, Answer) VALUES (?,?,?)`;
   
        database.query(
            sql,[QId, id, Answer],
           
            (err,result)=>{
                if(err){
                    console.log(err);
                    res.send({message:"Answer Not posted"});
                }
                else{
                    console.log(result)
                    res.send({message:"Answer Posted"});
    
                }
               
            }
    
        );

    
});




module.exports = app;