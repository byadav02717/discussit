import React,{useState} from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/*Functional component RemoveUser is pop-up dialog box to remove a user from the group.
It requires email of the user to remove.
The dialog box used is imported from material-ui
*/
export default function RemoveUser() {
  const [open, setOpen] = React.useState(false);
  const [emailsToRemove, setEmails] = useState('');

  var groupID = localStorage.getItem('groupID');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Call to API to remove the provided users from current group
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
            label="Users to remove"
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