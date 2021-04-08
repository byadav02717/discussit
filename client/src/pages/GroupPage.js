import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../css/grouppage.css'
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import {
    Grid,
    Button
} from '@material-ui/core/'
import CreateQuestion from '../components/CreateQuestion'

var questions = [];
questions.push({QId: 0, id: 1, GId: 0, Topic: "How do I post a question?", Question: "I'm having trouble figuring out how to post a question, can anyone help out?"});
questions.push({QId: 1, id: 1, GId: 0, Topic: "Where is the FAQ?", Question: "I can't find the FAQ, where is it?"});
questions.push({QId: 2, id: 1, GId: 0, Topic: "I need help!", Question: "I need help fast! When is HW1 due?"});
questions.push({QId: 3, id: 1, GId: 0, Topic: "Can someone tell me how I do this?", Question: "How do I reply to someone else's question?"});
questions.push({QId: 4, id: 1, GId: 0, Topic: "When is Quiz 1?", Question: "When is Quiz 1?"});
questions.push({QId: 5, id: 1, GId: 0, Topic: "When is Quiz 2?", Question: "When is Quiz 2?"});
questions.push({QId: 6, id: 1, GId: 0, Topic: "When is Quiz 3?", Question: "When is Quiz 3?"});
questions.push({QId: 7, id: 1, GId: 0, Topic: "When is Quiz 4?", Question: "When is Quiz 4?"});
questions.push({QId: 8, id: 1, GId: 0, Topic: "When is Quiz 5?", Question: "When is Quiz 5?"});
questions.push({QId: 9, id: 1, GId: 0, Topic: "When is Exam 1?", Question: "When is Exam 1?"});
questions.push({QId: 10, id: 1, GId: 0, Topic: "When is Exam 2?", Question: "When is Exam 2?"});
questions.push({QId: 11, id: 1, GId: 0, Topic: "When is Exam 3?", Question: "When is Exam 3?"});
questions.push({QId: 12, id: 1, GId: 0, Topic: "When is Exam 4?", Question: "When is Exam 4?"});

var answers = [];
/*
questions.forEach(q => {
    answers.push({AnswerId: 0, QId: q.QId, 
        id: q.id, Answer: q.Question});
})
*/
answers.push({AnswerId: 0, QId: 0, id: questions[0].id, Answer: questions[0].Question});
answers.push({AnswerId: 13, QId: 0, id: 2, Answer: "Click the 'Post Question' button."});

var users = [];
users.push({id: 1, email: "test@gmail.com"});
users.push({id: 2, email: "john@gmail.com"});

var question = [];

export default function GroupPage() {
    const [questionData, setquestionData] = useState([]);
    var groupName = localStorage.getItem('groupName');
    const [currAnswers, setCurrAnswers] = useState([]);

    function renderQuestions(props) {
        const { index, style } = props;
      
        return (
          <ListItem button style={style} key={index} onClick={() => {
              var answerList = []
              answers.forEach(answer => {
                if(answer.QId === index)
                {
                    answerList.push(answer)
                }
              })
              setCurrAnswers(answerList)
          }}>
            <ListItemText primary={`${questions[index].Topic}`} />
          </ListItem>
        );
    }
    renderQuestions.propTypes = {
        index: PropTypes.number.isRequired,
        style: PropTypes.object.isRequired,
    };
    
    function renderAnswers(props) {
        const { index, style } = props;
        
        console.log(currAnswers)
        return (
          <ListItem style={style} key={index}>
            <ListItemText primary={`${answers[index].Answer}`} />
            <ListItemText className='li-secondary' secondary={`Posted by: ${users[answers[index].id-1].email}`} />
          </ListItem>
        );
    }
    renderAnswers.propTypes = {
        index: PropTypes.number.isRequired,
        style: PropTypes.object.isRequired,
    };
    
    useEffect(() => {
        var groupID = localStorage.getItem('groupID');
        console.log(groupID)
        axios({
            method: 'get',
            url: 'http://localhost:3005/getquestions',
            data: {
                GId: groupID
            }
            }).then((response) => {
        
            for (var i = 0; i<response.data.length; i++)
            {
                question.push(response.data[i]);
            }
            //setquestionData(question);
            });
           
       }, []);



    /*
    var local_data = localStorage.getItem('user');
    local_data = JSON.parse(local_data);
    if(local_data.id === '-1'){
        return(
            <div>
                <p>You are not logged in.  Please log in first.</p>
                <Login></Login>
            </div>
        )
    }
    */

    return (
        <div>
            <div className="group-body">
                <h1>{groupName}</h1>
                {console.log(questionData)}
                <Grid container>

                <Grid className='QContainer' item xs={2.4}>    
                <FixedSizeList height={540} width={300} itemSize={46} itemCount={questions.length}>
                    {renderQuestions}
                </FixedSizeList>
                </Grid>

                <Grid className='AContainer' item xs={7.5}>  
                <FixedSizeList height={400} width={900} itemSize={46} itemCount={answers.length}>
                    {renderAnswers}
                </FixedSizeList>

                <div className='reply-area'>
                    <textarea id='reply-textarea' placeholder="Enter your comment or answer here."></textarea>
                    <br></br>
                    <Button>
                        Post Answer
                    </Button>
                </div>
                </Grid>

                </Grid>

                <Button>
                    
                    <CreateQuestion />
                </Button>
            </div>
        </div>
    )
}