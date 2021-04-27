import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import InviteUser from './InviteUser';
import RemoveUser from './RemoveUser';

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

        <Button className='remove-button'>
          <RemoveUser />
        </Button>
      </div>
    )
  }
  
  return (
    <p></p>
  )
}