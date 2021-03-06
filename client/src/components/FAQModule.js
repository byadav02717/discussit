import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../css/grouppage.css';

// useStyles for FAQ accordion and questions
const useStylesList = makeStyles((theme) => ({
  root: {
    width: 300,
    maxWidth: 900,
    maxheight: 100,
    backgroundColor: theme.palette.background.paper,
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    padding: '10px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
// end usestlyes

// FAQ module for posting, deleting, and viewing FAQ questions
export default function FAQModule() {
  const classes = useStyles();
  const classesList = useStylesList();

  const [authLevel, setAuthLevel] = useState([]);
  const [faqQuestions, setFaqQuestions] = useState([]);
  
  // get user auth (for showing delete button)
  useEffect(() => {
    var groupID = localStorage.getItem('groupID');
    var userId = JSON.parse(localStorage.getItem('user')).id;
    axios({
        method: 'get',
        url: 'http://localhost:3005/getauth',
        params: {
            groupId: groupID,
            userId: userId
        }
        }).then((response) => {
          setAuthLevel(response.data[0].auth);
    });
       
  }, [false]);

  // getting all FAQ questions in the current group
  useEffect(() => {
    var faqs = [];
    var groupID = localStorage.getItem('groupID');

    axios({
        method: 'get',
        url: 'http://localhost:3005/getfaq',
        params: {
            GId: groupID,
        }
        }).then((response) => {
          for (var i = 0; i<response.data.length; i++)
          {
            faqs.push(response.data[i]);
          }

          setFaqQuestions(faqs);
          console.log(faqQuestions);
    });
       
  }, [false]);


  // if auth is greater than user (0) level auth, show delete buttons
  if(authLevel > 0)
  {
    return (
      <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Frequently Asked Questions</Typography>
        </AccordionSummary>
        <AccordionDetails>
        
        {faqQuestions.map(elem => (
          <div className={classesList.root}>
          <ListItem>
            <ListItemText primary={`${elem.Topic}`} />
            <ListItemText primary={`${elem.Question}`} />

            <Button color="primary" onClick={() => {
              // delete FAQ button is pressed, so we delete the clicked question
              axios({
                method: 'post',
                url: 'http://localhost:3005/deletefaq',
                data: {
                    faqId: elem.faqId
                }
                }).then((response) => {
                
              });
            
              setTimeout(function () {
                window.location.reload();
              }, 500);
            }}>
              Delete
            </Button>
          </ListItem>
          </div>
        ))}

        </AccordionDetails>
      </Accordion>
    </div>
    )
  }
  
  // otherwise display user level FAQ module
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Frequently Asked Questions</Typography>
        </AccordionSummary>
        <AccordionDetails>
        
        {faqQuestions.map(elem => (
          <div className={classesList.root}>
          <ListItem>
            <Typography variant="h5" component="h3">
              {elem.Topic}
            </Typography>
            <Typography component="p">
              {elem.Question}
            </Typography>
          </ListItem>
          </div>
        ))}

        </AccordionDetails>
      </Accordion>
    </div>
  )
}