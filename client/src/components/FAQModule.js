import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PostFAQ from './PostFAQ';

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

export default function FAQModule() {
  const classes = useStyles();

  const [authLevel, setAuthLevel] = useState([]);
  const [faqQuestions, setFaqQuestions] = useState([]);
  
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

  useEffect(() => {
    var faqs = [];
    var groupID = localStorage.getItem('groupID');

    axios({
        method: 'get',
        url: 'http://localhost:3005/getfaq',
        params: {
            groupId: groupID,
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
          <Typography>
            {elem.Topic} - {elem.Question}
          </Typography>
        ))}

        </AccordionDetails>
      </Accordion>
    </div>
    )
  }
  
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
          <Typography>
            This is where FAQ questions will show up.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}