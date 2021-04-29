import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles'
import {
    Grid,
    Card,
    CardContent,
    CardHeader,
    Button
} from '@material-ui/core/'

// styling information for alert cards
const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      padding: theme.spacing(2)
  }
}))

const cardStyle = {
  width: '20vw',
  height: '8vw',
}
// end styling

// Alerts module, for pending invites a user may have
export default function Alerts() {
  var userId = JSON.parse(localStorage.getItem('user')).id;
  const [alerts, setAlerts] = useState('');
  const classes = useStyles();

  // call api for accepting an invite
  function acceptInvite(groupID, inviteId) 
  {
    // accept GId, userId
    axios({
      method: 'post',
      url: 'http://localhost:3005/accept',
      data: {
          GId: groupID,
          id: userId,
          inviteId: inviteId
      }
    }).then((response) => {
      if (response.data.message) {
      }
    });

    window.location.reload();
  }

  // call api for declining an invite
  function declineInvite(groupID, inviteId) 
  {
    // decline GId, userId
    axios({
      method: 'post',
      url: 'http://localhost:3005/delete',
      data: {
          GId: groupID,
          id: userId,
          inviteId: inviteId
      }
    }).then((response) => {
      if (response.data.message) {
      }
    });

    window.location.reload();
  }

  // get user invites (alerts)
  useEffect(() => {
    var alert = [];
    axios({
        method: 'get',
        url: 'http://localhost:3005/getalerts',
        params: {
          userId: userId
        }
        }).then((response) => {
    
        for (var i = 0; i<response.data.length; i++)
        {
            alert.push(response.data[i]);
        }

        setAlerts(alert);
    });   
  }, [false]);

  // if user has pending alerts, show them in a grid with accept/deny buttons
  if (alerts.length > 0)
  {
    var alertCount = alerts.length;
    return (
      <div>
        You have {alertCount} pending alerts.

      <div id='groups' className={classes.root}>
      <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
      >   
          {alerts.map(elem => (
              <Grid item xs={12} sm={6} md={3} key={alerts.indexOf(elem)}>
                  <Card style={cardStyle}>
                      <CardHeader
                          subheader={`You were invited to ${elem.GName} by ${elem.InviterEmail}`}
                      />
                      <CardContent>
                        <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} 
                          onClick={() => {acceptInvite(elem.GId, elem.inviteId)}}>
                              ✓
                          </Button>

                          <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                              onClick={() => {declineInvite(elem.GId, elem.inviteId)}}>
                              ⨉
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

  // otherwise, show that they have no alerts pending
  else return (
    <div>
      You do not have any pending alerts.
    </div>
  );
}