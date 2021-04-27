import React, {useState, useEffect} from 'react'
import '../css/dashboard.css'
import axios from 'axios';
import CreateGroup from '../components/CreateGroup'
import Alerts from '../components/Alerts'
import { makeStyles } from '@material-ui/core/styles'

import {
    Grid,
    Card,
    CardContent,
    CardHeader,
    Button
} from '@material-ui/core/'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    }
}))

export default function Dashboard () {
    const [groupL, setgroupL] = useState([]);
    const [logIn, setlogIn] = useState(false);
    const classes = useStyles();
    let history = useHistory();

    function openGroupPage(groupID, groupName) 
    {
        localStorage.setItem('groupID', groupID);
        localStorage.setItem('groupName', groupName);
        history.push('/group'); 
    }

   // var userId = JSON.parse(localStorage.getItem('user')).id;
    var grouplist = [];
    //const groupL = [];

    /*useEffect is used to check the login status of the user. 
    

    */
    React.useEffect(()=>{
        const loggedIn = localStorage.getItem('user')
        console.log(1);
        if(loggedIn)
        {
          setlogIn(true);
        }
    
      });
    
      axios.defaults.withCredentials = true;

   useEffect(() => {
   
    if(logIn)
    {
        let loggedIn= localStorage.getItem('user')
        const local_data = JSON.parse(loggedIn);
        
        var userid = JSON.parse(localStorage.getItem('user')).id;
        console.log(userid);
        
        axios({
            method: 'get',
            url: 'http://localhost:3005/groups',
            params: {
                id: userid
            }
            }).then((response) => {
        
            for (var i =0; i<response.data.length; i++)
            {
                grouplist.push(response.data[i]);
            }
            setgroupL(grouplist);
            
            });
        
       
    }


       
   },[logIn]);

  
/*If the user is not logged in, it simply instruct the user to login to access the page
Conditional rendering is used to show the content of page based on login status.
*/
   if(!logIn){
    return(
      <div>
      <p>You are not logged in.  Please log in first.</ p>
      

      </div>
    )
  }
/*If the user is logged in, it the option to create group and a list of group, the user is member of.
The component Alert is used to show the pending request for joining groups.
The Component CreateGroup is used to create a new group.
Conditional rendering is used to show the content of page based on login status.
*/
else{
    return (
        <div className="dashboard" >
            <p>Alerts: </p>
                <Alerts />
            <br></br>

            <p>Your Groups: </p>
            
            <div id='groups' className={classes.root}>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >   
                {groupL.map(elem => (
                    <Grid item xs={12} sm={6} md={3} key={groupL.indexOf(elem)}>
                        <Card>
                            <CardHeader
                                title={`${elem.GName}`}
                                subheader={`${elem.Gdesc}`}
                            />
                            <CardContent>
                                <Button onClick={() => {openGroupPage(elem.GId, elem.GName)}}>
                                    View Group
                                </Button>
                            </CardContent>
                        </Card>
                     </Grid>
                ))}

            </Grid>
        </div>
    
        <CreateGroup />

        </div>

    )

}
}