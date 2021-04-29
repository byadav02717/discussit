import React,{useState} from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/*Functional component CreateGroup is pop-up dialog box create a new group.
It requires Group name and group description text field to create the group.
The dialog box used is imported from material-ui

*/

export default function CreateGroup() {
  const [open, setOpen] = React.useState(false); // state variable to tractk and control the open and close state of dialog box.
  let local_data = localStorage.getItem('user');
    local_data = JSON.parse(local_data);
    const [GName, setGName] = useState('');//state to store the group name
    const [Gdesc, setGdesc] = useState('');//state to store the group description
    

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
  const createGroup=()=>{
        
    /*
      Calling the RESTful api using post method to insert the data about the newly created group into MySQL database. 
      API defined in the register.js of Server folder
      It passes Group name, description and id of the user as admin/ creater's id to API in its body
    */
    axios({
        method: 'post',
        url: 'http://localhost:3005/creategroup',
        data: {
            GName: GName,
            Gdesc: Gdesc,
            id: local_data.id
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

  // Rendering for the create group popup diaogue
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create a new Group
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create a Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create your group, please enter Group name and Description here. 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group Name"
            type="text"
            fullWidth
            onChange={(e)=>{
                setGName(e.target.value);
             }}
          />
          <TextField
            
            margin="dense"
            id="desc"
            label="Description"
            type="text"
            fullWidth
            onChange={(e)=>{
                setGdesc(e.target.value);
             }}

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createGroup} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}