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
                       //res.send({message:"Group Created"});
                        let sql2 = `INSERT INTO groupmembers (GId, id) VALUES (?,?)`;
                        //res.send({message:"Group Created"});
                        database.query(
                            sql2,[result.insertId,id],
                        
                            (err2,result2)=>{
                                if(err2){
                                    console.log(err2);
                                    //res.send({message:"not inserted to groupmembers"});
                                }
                                else
                                {
                                    console.log(result2)
                                }

                            }
    
                        );
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

app.get('/getquestions',(req,res)=>{
    const GId = req.body.GId;
    let sql = `SELECT * FROM questions WHERE GId = ?`;
    database.query(sql, [GId], 
        (err, result)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log(result)
                res.send(result)
            }
        });
})

app.get('/groups',(req,res)=>{
    const id = req.body.id;
    let sql = `SELECT GId FROM groupmembers WHERE id = 1`;
    database.query(
        sql,[id],
       
        (err,result)=>{
            if(err){
                console.log(err);
                //res.send({message:"Groups Not found"});
            }
            else{
                console.log(result)
                console.log({message:"groups found"});
                //res.send(result);
                var list= [];
                for (i = 0; i < result.length; i++) {
                    list.push(result[i].GId);
                }
                //res.send(list);
                
                if(list.length > 0)
                {

                let sql2 = `SELECT * FROM groups1 WHERE GId IN (${list})`;
                database.query(
                    sql2,list,
                   
                    (err2,result2)=>{
                        if(err2){
                            console.log(err2);
                            //res.send({message:"Groups Not found"});
                        }
                        else{
                            res.send(result2);
                            console.log(result2)
                        }
                    }
                );
                
                }


            }
           
        }

    );

});




module.exports = app;