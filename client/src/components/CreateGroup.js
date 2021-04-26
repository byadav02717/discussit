import React,{useState} from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CreateGroup() {
  const [open, setOpen] = React.useState(false);
  let local_data = localStorage.getItem('user');
    local_data = JSON.parse(local_data);
    const [GName, setGName] = useState('');
    const [Gdesc, setGdesc] = useState('');
    //const [GroupCreation, setGroupCreation] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const createGroup=()=>{
        
    
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
          //setGroupCreation(response.data.message);
        }
       
      });
      setOpen(false);

    }

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