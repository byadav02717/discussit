import React,{useState} from 'react'
import '../css/dashboard.css'
import axios from 'axios';
import {TextField} from '@material-ui/core';

export default function Dashboard () {
    let local_data = localStorage.getItem('user');
    local_data = JSON.parse(local_data);
    const [GName, setGName] = useState('');
    const [Gdesc, setGdesc] = useState('');
    const [GroupCreation, setGroupCreation] = useState('');
    if(local_data.id === '-1'){
        return(
            
            <div >
                Log in <a href='/login'>here</a>
               
    
    
    
            </div>
            
        )
    }

    
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
          setGroupCreation(response.data.message);
        }
       
      });

    }

    
    return (
        <div className="dashboard" >
            <p>Create a new Group: </p>
            
            <TextField 
             label="Group Name"
             color="primary"
             variant="outlined"
             type="text"
             onChange={(e)=>{
                setGName(e.target.value);
             }}
             />
             <TextField 
             label="Group Description"
             color="primary"
             variant="outlined"
             type="text"
             onChange={(e)=>{
                setGdesc(e.target.value);
             }}

             />
             <button onClick={createGroup}>Create</button>



        </div>
    )
}
