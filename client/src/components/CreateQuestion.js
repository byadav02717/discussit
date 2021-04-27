import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'



/*Functional component CreateQuestion is pop-up dialog box to create a new question.
It requires Topic name and Question description text field to create the question.
The dialog box used is imported from material-ui

*/
export default function CreateQuestion() {
  var userId = JSON.parse(localStorage.getItem('user')).id;
   
  const [open, setOpen] = React.useState(false);
  const [Topic, setTopic] = useState('');
  const [Question, setQuestion] = useState('');

  /*
    handleClickOpen is use to change state variable open to open the dialog box
  */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /*
    handleClose is use to change state variable open to close the dialog box
  */
  const handleClose = () => {
    setOpen(false);
  };

/*
      Calling the RESTful api using post method to insert the data about the newly created question into MySQL database. 
      API defined in the register.js of Server folder
      It passes id of creator, group id, topic and question to API in its body
    */
  const handlePost=()=>{
    axios({
        method: 'post',
        url: 'http://localhost:3005/question',
        data: {
            id: userId,
            GId: localStorage.getItem('groupID'),
            topic:Topic,
            question:Question
        }
      }).then((response) => {
        if (response.data.message) {
          console.log(response.data.message);
        }
       
      });
      setOpen(false);

      setTimeout(function () {
        window.location.reload();
      }, 500);
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Post question
      </Button>
      <Dialog fullWidth maxWidth = 'lg' open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Post a Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To post a new question, please enter the topic and question here.
          </DialogContentText>
          <TextField
          id="outlined-secondary"
          label="Topic"
          fullWidth
          multiline
          rows = {1}
          margin = "normal"
          //defaultValue="Default Value"
          variant="outlined"
          onChange={(e)=>{
            setTopic(e.target.value);
         }}
        />
           <TextField
          id="outlined-multiline-static"
          label="Question"
          multiline
          rows={7}
          fullWidth
          margin = "normal"
          //defaultValue="Default Value"
          variant="outlined"
          onChange={(e)=>{
            setQuestion(e.target.value);
         }}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePost} color="primary">
            POST
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
