import React from 'react'
import '../css/grouppage.css'
import axios from 'axios';
import Login from './Login';


export default function GroupPage() {

    var groupID = localStorage.getItem('groupID');
    var local_data = localStorage.getItem('user');
    local_data = JSON.parse(local_data);
    if(local_data.id === '-1'){
        return(
            <div>
                <p>You are not logged in.  Please log in first.</p>
                <Login></Login>
            </div>
        )
    }

    return (
        <div>
            <h1>Group {groupID} Page</h1>
        </div>
    )
}