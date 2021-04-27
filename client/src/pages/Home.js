import React from 'react'
import {Link} from "react-router-dom";
import '../css/Home.css';

/*
functional componenet Home is the layout for landing page.
It uses an image and a button called Get started that takes user to registration page
*/
export default function Home() {
    return (
        <div id="home">
            <img src="/student-image2.jpg" alt="" />

         <div className = "container">
      <Link to="/register">
      <button className = "btn">Get Started</button>
          </Link>
       </div>
        </div>
    );
    
}
