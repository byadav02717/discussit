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
import AdminModule from '../components/AdminModule'

export default function GroupPage() {
    var groupName = localStorage.getItem('groupName');

    const [questionData, setquestionData] = useState([]);
    const [userData, setUserData] = useState([]);
    
    const [currQuestion = -1, setCurrQuestion] = useState([]);
    const [currAnswers, setCurrAnswers] = useState([]);
    const [answerText, setAnswer] = useState('');

    function renderQuestions(props) {
        const { index, style } = props;

        return (
          <ListItem button style={style} key={index} onClick={() => {
              setCurrQuestion(questionData[index].QId);

                var answer = [];
                var questionID = questionData[index].QId;
                var questionPoster = questionData[index].id;
                var questionText = questionData[index].Question; 

                console.log(questionID)

                axios({
                    method: 'get',
                    url: 'http://localhost:3005/getanswers',
                    params: {
                        QId: questionID
                    }
                    }).then((response) => {
                        
                        answer.push({answerId: -1, QId: questionID, id: questionPoster, Answer: questionText})

                        for (var i = 0; i<response.data.length; i++)
                        {
                            answer.push(response.data[i]);
                        }

                        setCurrAnswers(answer);
                        console.log(currAnswers);
                    });
                   
          }}>
            <ListItemText primary={`${questionData[index].Topic}`} />
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
            <ListItemText primary={`${currAnswers[index].Answer}`} />
            <ListItemText className='li-secondary' secondary={`Posted by: ${userData.find(x => x.id === currAnswers[index].id).email}`} />
          </ListItem>
        );
    }
    renderAnswers.propTypes = {
        index: PropTypes.number.isRequired,
        style: PropTypes.object.isRequired,
    };

    // get user data
    useEffect(() => {
        var user = [];
        axios({
            method: 'get',
            url: 'http://localhost:3005/getusers',
            }).then((response) => {
        
            for (var i = 0; i<response.data.length; i++)
            {
                user.push(response.data[i]);
            }

            setUserData(user);
            console.log(userData);
        });
           
       }, [false]);
    
    // get questions data
    useEffect(() => {
        var question = [];
        var groupID = localStorage.getItem('groupID');
        console.log(groupID)
        axios({
            method: 'get',
            url: 'http://localhost:3005/getquestions',
            params: {
                GId: groupID
            }
            }).then((response) => {
        
            for (var i = 0; i<response.data.length; i++)
            {
                question.push(response.data[i]);
            }
            setquestionData(question);
        });
           
       }, [false]);

       const handlePostAnswer=()=>{
        var userId = JSON.parse(localStorage.getItem('user')).id;
        axios({
            method: 'post',
            url: 'http://localhost:3005/answer',
            data: {
                QId: currQuestion,
                id: userId,
                Answer: answerText
            }
          }).then((response) => {
            if (response.data.message) {
              console.log(response.data.message);
            }
           
          });
          // refresh 
          setTimeout(function () {
            window.location.reload();
          }, 500);
      }

    return (
        <div>
            <div className="group-body">
                <h1>{groupName}</h1>
                <AdminModule />

                <Grid container>

                <Grid className='QContainer' item xs={2.4}>    
                <FixedSizeList height={540} width={300} itemSize={46} itemCount={questionData.length}>
                    {renderQuestions}
                </FixedSizeList>
                </Grid>

                <Grid className='AContainer' item xs={7.75}>  
                <FixedSizeList height={400} width={1000} itemSize={46} itemCount={currAnswers.length}>
                    {renderAnswers}
                </FixedSizeList>

                <div className='reply-area'>
                    <textarea id='reply-textarea' placeholder="Enter your comment or answer here." onChange={(e)=>{
                        setAnswer(e.target.value);
                    }}></textarea>
                    <br></br>
                    <Button classname='post-a-button' variant="outlined" color="primary" onClick={handlePostAnswer}>
                        Post Answer
                    </Button>
                </div>
                </Grid>

                </Grid>

                <Button className='post-q-button'>
                    <CreateQuestion />
                </Button>
            </div>
        </div>
    )
}