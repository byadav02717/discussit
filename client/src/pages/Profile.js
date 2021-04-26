import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
function Profile() {
    const [pw, setpw] = useState("")
    const [cpw, setcpw] = useState("")
    const [passworderror1, setpassworderror1] = useState("");
    const [err1, seterr1] = useState(false);
    const [passworderror, setpassworderror] = useState("");
    const [err, seterr] = useState(false);
    
    const changePassword=()=>{
      var userid = JSON.parse(localStorage.getItem('user')).id;
      axios({
        method: 'put',
        url: 'http://localhost:3005/changepw',
        data: {
            id: userid,
            Password: pw
        }
      }).then((response) => {
        console.log(response);
        if(response.data){
          console.log(response.data)
          

        }
       
      }, (error) => {
        console.log(error);
      });
        

    }

    useEffect(() => {
      if(pw.length<8 || pw.length> 15)
      {
        setpassworderror1("Password length should be 8 to 15 characters");
        seterr1(true);
        seterr(false);

      }
      else if(pw !==  cpw)
      {
        setpassworderror("Password didn't match");
        setpassworderror1("");
        seterr(true);
        seterr1(false);
      }
      else{
        setpassworderror("");
        setpassworderror1("");
        seterr(false);
        seterr1(false);
      }
      
    }, [cpw, pw])



  const classes = useStyles();
  return (
    <div>
      This is profile page
      <div>Your Email: {JSON.parse(localStorage.getItem("user")).Email}</div>
      <div>
        change password:
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField
              id="standard-password-input"
              label="current password"
              type="password"
              
              autoComplete="current-password"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
            error={err1}
              id="outlined-password-input"
              label="New password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              helperText={passworderror1}
              onChange={(e)=>{setpw(e.target.value)}}
            />
            <TextField
              error={err}
              id="outlined-password-input"
              label="Confirm New password"
              type="password"            
              autoComplete="current-password"
              variant="outlined"
              helperText={passworderror}
              onChange={(e)=>{setcpw(e.target.value)}}
            />
          </div>
          
          <div>
            <Button
              type="Submit"
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              onClick = {changePassword}
              disabled={pw.length<8  || err}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
      
    </div>
  );
}

export default Profile;
