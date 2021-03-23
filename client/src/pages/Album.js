import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../css/Album.css'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <div id='album'> 
    <h1>Create Group</h1>
    <Card className={classes.root}>
      <CardActionArea>
      <CardMedia
          component="img"
          alt=""
          height="140"
          image="../plus.png" //https://www.subpng.com/png-5dtlwm/download.html
          title="Groups"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            New Group
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Create a new group
          </Typography>
        </CardContent>

        
      </CardActionArea>
      <CardActions>
        <Button size="large" color="primary">
          Create
        </Button>
      </CardActions>
    </Card>

     <h1> Your Groups</h1> 
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt=""
          height="140"
          image="../student-image.jpg"
          title="Groups"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            CSE-3311: Object Oriented Software Engineering
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
  );
}