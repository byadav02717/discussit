import React from 'react'
import '../css/dashboard.css'
import axios from 'axios';
import CreateGroup from '../components/CreateGroup'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
    var groups = [];

    axios({
        method: 'get',
        url: 'http://localhost:3005/groups',
        data: {
            id: userId
        }
      }).then((response) => {

        for (var i =0; i<response.data.length; i++)
        {
            groups.push(response.data[i]);
        }

        console.log(groups);
    });

    return (
        <div className="dashboard" >
            <p>Create a new Group: </p>
            
            <CreateGroup />
            
            <Card className= "groups" >
                <CardActionArea>
                
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Group Name
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        It is discussion pane for CSE-3311-02
                    </Typography>
                </CardContent>
                </CardActionArea>
                
                <CardActions>
                    <Button size="small" color="primary">
                        About
                    </Button>
                    <Button size="small" color="primary">
                        View Group
                    </Button>
                </CardActions>
            </Card>


        </div>

    )
}
