import React,{useState} from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


/*Functional component InviteUser is pop-up dialog box to invite user into the group.
It requires email of the user to invite.
The dialog box used is imported from material-ui

*/
export default function InviteUser() {
  const [open, setOpen] = React.useState(false);
  const [emailsToInvite, setEmails] = useState('');

  var groupID = localStorage.getItem('groupID');
  var inviteId = JSON.parse(localStorage.getItem('user')).id;
  var inviterEmail = JSON.parse(localStorage.getItem('user')).Email;
  var groupName = localStorage.getItem('groupName');
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

  const inviteUsers=()=>{   
    var emailList = emailsToInvite.replace(/\s+/g, '').split(',');


    /*
      Calling the RESTful api using post method to insert the data about the requests into MySQL database. 
      API defined in the register.js of Server folder
      It passes group id, Email of the person who invites, id, group name and inviter email to API in its body
    */
    for(var i=0; i<emailList.length; i++)
    {
      axios({
        method: 'post',
        url: 'http://localhost:3005/request',
        data: {
          GId: groupID,
          Email: emailList[i],
          inviteId: inviteId,
          groupName: groupName,
          InviterEmail: inviterEmail
        }
      }).then((response) => {
        if (response.data.message) {
          //setGroupCreation(response.data.message);
        }
       
      });
    }
    setOpen(false);

  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Invite User(s)
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Invite User(s)</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To invite user(s), input their emails seperated by commas.
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
          <Button onClick={inviteUsers} color="primary">
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}