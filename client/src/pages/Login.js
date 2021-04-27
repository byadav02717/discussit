import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import "../Form.css"
// component profile is used to shown the user's information and an option to change their password.
import Profile from './Profile';
import Button from '@material-ui/core/Button';




function Login(){
  let history = useHistory();
  const [emailReg, setemailReg] = useState('');// state variable to store the email in login form
  const [logIn, setlogIn] = useState(false); //state variable to store the login status
  const [passwordReg, setpasswordReg] = useState('');// state variable to store the password in the login form
  const [LoginStatus, setLoginStatus] = useState('');// state variable to store login status


  axios.defaults.withCredentials = true;

  //function to logout the user 
  const logout=()=>{
    localStorage.clear();
    setlogIn(false);

  }
  
  /*
    Calling the RESTful api using post method to check if the user exists with particular email and password.
    API defined in the register.js file of server/routes
    It passes email and password in its body.
  */
  const handleSubmit = event => {
    event.preventDefault();
    
    axios({
        method: 'post',
        url: 'http://localhost:3005/login',
        data: {
            Email: emailReg,
            Password: passwordReg
        }
      }).then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
        
          localStorage.setItem('user',JSON.stringify(response.data));
          history.push('/dashboard');
          
        }
       
      });
 
  }

  //useEffect is used to change the value of state variable logIn.
  
  React.useEffect(()=>{
    const loggedIn = localStorage.getItem('user')
    console.log(1);
    if(loggedIn)
    {
      setlogIn(true);
    }

  });
// State variable logIn is used for conditional renedering. if user is not logged in, 
// login form is shown otherwise profile information is shown
  if(logIn){
    return(
      <div>
      <p>You are already logged in </p>
      <Button onClick = {logout}>Logout</Button>
      <br/><br/>
      <br/><br/>

      <div>
        <Profile />
      </div>

      </div>
    )
  }

   
    return (
      <div className='form-content-centre'>
          <form className='form' onSubmit={handleSubmit}>
            <h1 className='form-title'>
              Login
            </h1>
            <p>Enter your credentials below to log in.</p>
            <br />
          
          
          <div className='form-input'>
            <label htmlFor='Email' className='form-label'>
              Email: 
            </label>
              <input 
              id='Email'
              className='form-input'
              type="text" 
              placeholder="Enter your email address"
              onChange={(e)=>{
                setemailReg(e.target.value);
             }}
              
              />
            
          </div>
           
            <div className='form-input'>
            <label htmlFor='pass' className='form-label'>
              Password: 
            </label>
              <input 
              id='pass'
              className='form-input'
              type="password" 
              placeholder="Enter your password"
              onChange={(e)=>{
                setpasswordReg(e.target.value);
             }}
              
              />
            </div>
             
            Don't have an account? Sign up <a href='/register'>here</a>
            <br />

          <button className='button' type="submit">Login</button>
        </form>
      <p>{LoginStatus}</p>
       </ div> 
    );
}


 
export default Login;