import React from 'react'
import '../css/dashboard.css'
import axios from 'axios';
import CreateGroup from '../components/CreateGroup'
import Login from './Login'
import { makeStyles } from '@material-ui/core/styles'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardHeader,
    Button
} from '@material-ui/core/'

function openGroupPage(groupID) {
    console.log(groupID)
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    }
}))

export default function Dashboard () {
    const classes = useStyles()

    let local_data = localStorage.getItem('user');
    local_data = JSON.parse(local_data);

    if(local_data.id === '-1'){
        return(
            <div>
                <p>You are not logged in.  Please log in first.</p>
                <Login></Login>
            </div>

            /*
            <div >
                Log in <a href='/login'>here</a>
    
            </div>
            */
            
        )
    }

    var userId = JSON.parse(localStorage.getItem('user')).id;
    var grouplist = [];

    setTimeout(function(){
        axios({
            method: 'get',
            url: 'http://localhost:3005/groups',
            data: {
                id: userId
            }
          }).then((response) => {
    
            for (var i =0; i<response.data.length; i++)
            {
                grouplist.push(response.data[i]);
            }
        })
    }, 1000);

    var testgroups = []
    testgroups.push({
        GId: 0,
        GName: "TestGroup1",
        Gdesc: "Test 1",
        id: "1"
    })

    testgroups.push({
        GId: 1,
        GName: "TestGroup2",
        Gdesc: "Test 2",
        id: "1"
    })

    testgroups.push({
        GId: 2,
        GName: "TestGroup3",
        Gdesc: "Test 3",
        id: "1"
    })

    return (
        <div className="dashboard" >
            {console.log(grouplist)}
            <p>Create a new Group: </p>
            
            <CreateGroup />
            
            <div class='groups hide' className={classes.root}>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >   
                {testgroups.map(elem => (
                    <Grid item xs={12} sm={6} md={3} key={testgroups.indexOf(elem)}>
                        <Card>
                            <CardHeader
                                title={`${elem.GName}`}
                                subheader={`${elem.Gdesc}`}
                            />
                            <CardContent>
                                <Button onClick={() => { openGroupPage(elem.GId) }}>
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
