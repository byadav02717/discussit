import React from 'react'
import '../css/dashboard.css'
import axios from 'axios';
import CreateGroup from '../components/CreateGroup'

export default function Dashboard () {
    let local_data = localStorage.getItem('user');
    local_data = JSON.parse(local_data);

    if(local_data.id === '-1'){
        return(
            
            <div >
                Log in <a href='/login'>here</a>
    
            </div>
            
        )
    }

    var userId = JSON.parse(localStorage.getItem('user')).id;

    

    axios({

        method: 'get',

        url: 'http://localhost:3005/groups',

        data: {

            id: userId

        }

      }).then((response) => {

        console.log(response);

    });

    
    return (
        <div className="dashboard" >
            <p>Create a new Group: </p>
            
            <CreateGroup />
            
            


        </div>

    )
}
