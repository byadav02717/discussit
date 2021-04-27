import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import '../css/profile.css';


const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

/*
  functional componet is made for the user to have option to change their password.
*/
function Profile() {
    const [pw, setpw] = useState("")//state variable to store password.
    const [opw, setopw] = useState("")//state variable to store old password.
    const [cpw, setcpw] = useState("")//state variable to store confirm password.
    const [passworderror1, setpassworderror1] = useState("");// state variable to store error message
    const [err1, seterr1] = useState(false);// state variable to track the status of error
    const [passworderror, setpassworderror] = useState("");// state variable to store error message
    const [err, seterr] = useState(false);// state variable to track the status of error
    
    /*
      Calling the RESTful api using post method to update the password of the userin MySQL database. 
      API defined in the register.js of server/routes/
      It passes id, Password, id, OldPassword to API in its body
    */

    const changePassword=()=>{
      var userid = JSON.parse(localStorage.getItem('user')).id;
      axios({
        method: 'put',
        url: 'http://localhost:3005/changepw',
        data: {
            id: userid,
            Password: pw,
            OldPassword: opw
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
      if((pw.length<8 || pw.length> 15) && pw.length>0)
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
    <div className='profile'>
      <div>Your Email: {JSON.parse(localStorage.getItem("user")).Email}</div>
      <div>
        <br></br>
        Change Password:
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField
              id="standard-password-input"
              label="Current Password"
              type="password"
              
              autoComplete="current-password"
              variant="outlined"
              onChange={(e)=>{setopw(e.target.value)}}
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
            <br></br>
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
