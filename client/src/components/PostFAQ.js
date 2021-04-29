import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'

// Dialogue and form for posting a FAQ
export default function PostFAQ() {
  var userId = JSON.parse(localStorage.getItem('user')).id;
   
  const [open, setOpen] = React.useState(false);
  const [Topic, setTopic] = useState('');
  const [Question, setQuestion] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Calling to API to post a new FAQ
  const handlePost=()=>{
    axios({
        method: 'post',
        url: 'http://localhost:3005/postfaq',
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

  // Rendering post FAQ button, form and dialogue
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Post FAQ
      </Button>
      <Dialog fullWidth maxWidth = 'lg' open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Post a new FAQ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To post a new FAQ, fill in a question topic and answer.
          </DialogContentText>
          <TextField
          id="outlined-secondary"
          label="Question Topic"
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
          label="Answer"
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
