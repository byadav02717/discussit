import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (

    <Card className={classes.root}>
        <h1> Your Groups</h1>
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
  );
}