import React from 'react'
import {useState} from 'react';
import '../Form.css';
import axios from 'axios';
import { useHistory } from "react-router-dom";
function Register() {
  
  let history = useHistory();
    const [emailReg, setemailReg] = useState('');
    const [passwordReg, setpasswordReg] = useState('');
    //const [isregistered, setregister] = useState(false);

    
    const handleSubmit = event => {
      event.preventDefault();
      //alert('You have submitted the form.')
      axios({
          method: 'post',
          url: 'http://localhost:3005/register',
          data: {
              Email: emailReg,
              Password: passwordReg
          }
        }).then((response) => {
          console.log(response);
          if(response.data){
            console.log(response.data)
            history.push('/registersucess');

          }
         
        }, (error) => {
          console.log(error);
        });
   
    }

    return (
      <div id="register-form">
        <div className='form-content-centre'>
        <form className='form' onSubmit={handleSubmit}>
          <h1 className='form-title'>
            Registration
          </h1>
          <p>Get started with us today! 
            Create your account by fillig out the
            information below.</p>
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
              placeholder="Enter a new password"
              onChange={(e)=>{
                setpasswordReg(e.target.value);
             }}
              
              />
            </div>
     
          <button className='button' type="submit">Register</button>
        </form>


       </ div>
       </div>
      
    
    );
}
export default Register;