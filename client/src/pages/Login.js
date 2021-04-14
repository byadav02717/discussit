import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import "../Form.css"
import { Button } from '@material-ui/core';


function Login(){
  let history = useHistory();
  const [emailReg, setemailReg] = useState('');
  const [logIn, setlogIn] = useState(false);
  const [passwordReg, setpasswordReg] = useState('');
  const [LoginStatus, setLoginStatus] = useState('');


  axios.defaults.withCredentials = true;

  const logout=()=>{
    localStorage.clear();
    setlogIn(false);

  }
  

  const handleSubmit = event => {
    event.preventDefault();
    //alert('You have submitted the form.')
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
          //setToken(response.data.id);
          localStorage.setItem('user',JSON.stringify(response.data));
          history.push('/dashboard');
          //setLoginStatus(response.data[0].Email);
        }
       
      });
 
  }
  React.useEffect(()=>{
    const loggedIn = localStorage.getItem('user')
    console.log(1);
    if(loggedIn)
    {
      setlogIn(true);
    }

  });

  if(logIn){
    return(
      <div>
      <h1>You are already logged in </h1>
      <Button onClick = {logout}>Logout</Button>

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