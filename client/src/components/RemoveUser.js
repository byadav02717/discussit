import React,{useState} from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function InviteUser() {
  const [open, setOpen] = React.useState(false);
  const [emailsToRemove, setEmails] = useState('');

  var groupID = localStorage.getItem('groupID');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeUsers=()=>{   
    var emailList = emailsToRemove.replace(/\s+/g, '').split(',');

    for(var i=0; i<emailList.length; i++)
    {
      axios({
        method: 'post',
        url: 'http://localhost:3005/removeuser',
        data: {
          GId: groupID,
          Email: emailList[i],
        }
      }).then((response) => {
        if (response.data.message) {

        }
      });
    }
    setOpen(false);

  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Remove User(s)
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Remove User(s)</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To remove user(s), input their emails seperated by commas.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="emails"
            label="Users to invite"
            type="text"
            fullWidth
            onChange={(e)=>{
                setEmails(e.target.value);
             }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={removeUsers} color="primary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}