var express = require('express');
var app = express();

var databse = require('../config/database');



app.get('/register', (req,res)=>{
    let sql = 'SELECT * FROM user1';

    databse.query(sql, (err,result)=>{
        if(err){
            res.status(400).json({
                message: err
            });
            return;
        }

        if(result.length) res.json(result);
        else res.json({});
    })
});


// app.get('tweets/user/:id',(req,res)=>{
//     let sql = 'SELECT * FROM TWEETS WHERE user_id = ${req.params.id}';

//     databse.query(sql, (err,result)=>{
//         if(err){
//             res.status(400).json({
//                 message: err
//             });
//             return;
//         }

//         if(result.length) res.json(result);
//         else res.json({});
//     })
// });

// app.post('/tweets',(req,res)=>{
//     let sql = 'INSERT INTO TWEETS(user_id, content, date_time) VALUES('${req.body.user_id}','${req.body.content}','${moment().utc().format("YY-MM-DD")}')';
//     });
//     databse.query(sql, (err,result)=>{
//         if(err){
//             res.status(400).json({
//                 message: err
//             });
//             return;
//         }

    
//     });

module.exports = app;