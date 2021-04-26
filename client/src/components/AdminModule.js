import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InviteUser from './InviteUser';

export default function AdminModule() {
  const [authLevel, setAuthLevel] = useState([]);
  
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

  if(authLevel > 0)
  {
    return (
      <div className='admin-panel'>
        <p>Signed in as a group administrator.</p>
        <Button className='invite-button'>
          <InviteUser />
        </Button>
      </div>
    )
  }
  
  return (
    <p></p>
  )
}