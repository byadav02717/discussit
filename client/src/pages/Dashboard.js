import React from 'react'
import '../css/dashboard.css'
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

    
    return (
        <div className="dashboard" >
            <p>Create a new Group: </p>
            
            <CreateGroup />
            
            


        </div>
    )
}
