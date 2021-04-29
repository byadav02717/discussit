import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import InviteUser from './InviteUser';
import RemoveUser from './RemoveUser';
import FAQModule from './FAQModule';
import PostFAQ from './PostFAQ';

// Admin module (for auth in a given group)
export default function AdminModule() {
  const [authLevel, setAuthLevel] = useState([]);
  
  // get auth for user in the current group
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

  // if user has greater than user (0) level auth, display admin panel + faq module
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

        <Button className='faq-button'>
          <PostFAQ />
        </Button>

        <br></br>
        <FAQModule></FAQModule>
      </div>
    )
  }
  
  // otherwise, we'll just show them the FAQ module
  return (
    <FAQModule></FAQModule>
  )
}