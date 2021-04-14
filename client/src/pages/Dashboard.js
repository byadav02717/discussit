import React, {useState, useEffect} from 'react'
import '../css/dashboard.css'
import axios from 'axios';
import CreateGroup from '../components/CreateGroup'
import Login from './Login'
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
    const [User, setUser] = useState({});
    const [logIn, setlogIn] = useState(false);
    const [load, setload] = useState(false);
    const classes = useStyles()
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
        setUser(local_data);
        
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

  
    
   if(!logIn){
    return(
      <div>
      <p>You are not logged in.  Please log in first.</ p>
      

      </div>
    )
  }

else{
    return (
        <div className="dashboard" >
            {console.log(groupL)}
            <p>Create a new Group: </p>
            
            <CreateGroup />
            
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

        </div>

    )

}

    
   
}
