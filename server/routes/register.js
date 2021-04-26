var express = require('express');
var app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10

var database = require('../config/database');


//POST method to register a user. Add email and hashed password into the database.
app.post('/register', (req,res)=>{
    const Email=req.body.Email;
    const Password=req.body.Password;
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
                    res.send({message: "Wrong username and password combination"});
                }
            })
            }
            else{
                res.send({message:"User doesn't exist"});                

            }
        
        }
 
     );
 });

 //POST method to create a new group. The user who create the group will be the admin of the group and also a member.
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
                        // add owner of group to group with auth 2 (owner)
                        let sql2 = `INSERT INTO groupmembers (GId, id, auth) VALUES (?,?, 2)`;
                        database.query(
                            sql2,[result.insertId,id],
                        
                            (err2,result2)=>{
                                if(err2){
                                    console.log(err2);
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

//POST method to add a question in a group into the database.
app.post('/question', (req,res)=>{
    const id = req.body.id;
    const GId = req.body.GId;
    const topic = req.body.topic;
    const question = req.body.question;
    
    let sql = `INSERT INTO questions(id, GId, Topic, Question) VALUES (?,?,?,?)`;
   
        database.query(
            sql,[id, GId, topic, question],
           
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

//POST method to add an answer to a question in the database.
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

//GET method to get all the answers posted for a particular questions.
app.get('/getanswers',(req,res)=>{
    const QId = req.query.QId;
    let sql = `SELECT * FROM answers WHERE QId = ?`;
    database.query(sql,[QId],
        (err, result)=>{
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log(result)
                res.send(result)
            }
        })
})



//GET method to get all the questions in a group
app.get('/getquestions',(req,res)=>{
    const GId = req.query.GId;
    console.log(GId);
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

//GET method to get all the answers in a question
app.get('/getanswers',(req,res)=>{
    const QId = req.query.QId;
    console.log(QId);
    let sql = `SELECT * FROM answers WHERE QId = ?`;
    database.query(sql, [QId], 
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

//GET method to get all the users id and emails
app.get('/getusers',(req,res)=>{
    let sql = `SELECT id, email FROM users`;
    database.query(sql, [], 
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

//GET method to get the names and group id of all the groups, a user is in.
app.get('/groups',(req,res)=>{
    const id = req.query.id;
    console.log(id)
    let sql = `SELECT GId FROM groupmembers WHERE id = ?`;
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

    app.post('/request', (req,res)=>{

        const GId = req.body.GId;
        const email = req.body.Email;
        const inviteId = req.body.inviteId;
        let sql1 = `SELECT id FROM users WHERE EMAIL = ?`;
    
    let sql2 = `INSERT INTO invites(GId, userId, inviteId) VALUES (?,?)`;


    database.query(sql1,[email],
        (err, result)=>{
            if(err){
                console.log(error);
            }
            else{
                console.log(result)
                console.log(result.length)
                if(result.length == 1)
                {
                    database.query(sql2, [GId, result[0].id, inviteId],
                        (err2,result2)=>{
                            if(err2){
                                console.log(err2)
                                res.send({message:"Request already sent"})
                            }
                            else{
                                console.log(result2);
                                res.send({message:"Requested sent sucessfully"})
                            }
                        })
                   
                }
                else{
                    console.log("User does not exist.")
                }
            }
        })

    })


    app.post('/accept', (req, res)=>{
        const GId = req.body.GId;
        const id = req.body.id;
        let sql1 = `INSERT INTO groupmembers(GId, id) VALUES (?,?)`;
        let sql2 = `DELETE FROM invites(GId, id) VALUES (?,?)`;
        database.query(sql1, [GId, id],
            (err1,result1)=>{
                if(err1){
                    console.log(err1)
                    res.send({message:"You are already a member"})
                }
                else{
                    console.log(result1);
                    database.query(sql2, [GId, id],
                        (err2,result2)=>{
                            if(err2){
                                console.log(err2)
                                console.log("Request not deleted")
                            }
                            else{
                                console.log(result2);
                                console.log("Request deleted")
                            }
                        })
                    res.send({message:"Membership accepted"})

                }
            })
    })

    app.delete('/delete', (req, res)=>{
        const GId = req.body.GId;
        const id = req.body.id;
       
        let sql1 = `DELETE FROM invites(GId, id) VALUES (?,?)`;
       
        database.query(sql1, [GId, id],
            (err1,result1)=>{
                if(err1){
                    console.log(err1)
                    console.log("Request not deleted")
                }
                else{
                    console.log(result1);
                    console.log("Request deleted")
                }
            }
        )
                    

    })




});

module.exports = app;