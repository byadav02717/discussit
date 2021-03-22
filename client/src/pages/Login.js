import React, {useState} from 'react';

import '../Form.css'

import axios from 'axios';



function Login(){

  const [emailReg, setemailReg] = useState('');
  const [passwordReg, setpasswordReg] = useState('');


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
        console.log(response);
      }, (error) => {
        console.log(error);
      });
 
  }

   
    return (
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
       type="text" 
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
    );
}
 
export default Login;