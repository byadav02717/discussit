import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import '../Form.css'

import axios from 'axios';



function Login(){

  let history = useHistory();
  const [emailReg, setemailReg] = useState('');
  const [passwordReg, setpasswordReg] = useState('');
  const [LoginStatus, setLoginStatus] = useState('');


  axios.defaults.withCredentials = true;

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
          history.push('/dashboard');
          //setLoginStatus(response.data[0].Email);
        }
       
      });
 
  }

   
    return (
      <div>
      <form className='form' onSubmit={handleSubmit}>
      <div className='form-inputs'>
        <h1>Sign in</h1>
     <label>
       Email: 
     </label>
       <input className='form-input'
       type="text"
       //name = "Email"
       placeholder="Email Address"
       onChange={(e)=>{
          setemailReg(e.target.value);
       }}
       
       />
       </div>
     <div className='form-inputs'>
     <label>
       Password: 
     </label>
     <input className='form-input'
       type="password" 
       //name="Password"
       placeholder="Password"
       onChange={(e)=>{
         setpasswordReg(e.target.value);
      }}
       
       />
       </div>
     
     
     Don't have an account? Register <a href='/register'>here</a>.
     <br></br>
     <button type="submit">Log in</button>
   
   </form>
   <h1>{LoginStatus}</h1>
   </div>
    );
}
 
export default Login;