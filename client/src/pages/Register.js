import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom"; 
import '../css/Register.css';

function Register() {

  let history = useHistory();
  const [emailReg, setemailReg] = useState('');
  const [passwordReg, setpasswordReg] = useState('');
  const [emailError, setEmailError] = useState('');
  const [err, seterr] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [err1, seterr1] = useState('');

  // handle submitting info when registering an account
  const handleSubmit = event =>{ 
      event.preventDefault();
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

  // error checking email and pw, and setting errors for rendering
  useEffect(() => {
    var regexEmail = /@+.+(com|co|org|fr|net|de|ru|it|es|nl|ca|be|ch|edu)/;
    var resultEmail = regexEmail.test(emailReg);
    if(!resultEmail && emailReg.length > 0)
    {
      setEmailError("Invalid email");
      seterr(true);
      seterr(false);
    }
    else{
      setEmailError("");
      seterr(false);
    }

    if((passwordReg.length < 8 || passwordReg.length > 15) && passwordReg.length > 0)
    {
      setpasswordError("Length should be 8 to 15 characters");
      seterr1(true);
      seterr(false);
    }
    else{
      setpasswordError("");
      seterr1(false);
    }

  }, [emailReg, passwordReg])

  // display registration form
  return (
      <div className='form-content-centre'>
        <form className='form' onSubmit={handleSubmit}>
          <h1 className='form-title'>
            Registration
          </h1>
          <p>Get started with us today! 
           <br/> Create your account by filling out the
            information below.</p>
          <br />
          
          
          <div className='form-input'>
          <label htmlFor='Email' className='form-label'>
              Email: 
          </label>
            <input 
              error={err}
              id='Email'
              className='form-input'
              type="text" 
              placeholder="Enter your email address"
              helperText = {emailError}
              onChange={(e)=>{
                setemailReg(e.target.value);
              }}
              
            />
            
          </div>
          <div className='error'>
            <p>{emailError}</p>
          </div>
           
          <div className='form-input'>
            <label htmlFor='pass'  className='form-label'>
            Password: 
            </label>
            <input 
              error={err1}
              id='pass'
              className='form-input'
              type="password" 
              placeholder="Enter a new password"
              helperText = {passwordError}
              onChange={(e)=>{
                setpasswordReg(e.target.value);
            }}
              
            />

          </div>
          <div className='error'>
              <p>{passwordError}</p>
          </div>
     
          Already have an account? Log in <a href='/login'>here</a>
          <br />
             
          <button className='button' type="submit" disabled={err || err1}>Register</button>
        </form>

       </ div>    
  );
}
export default Register;
