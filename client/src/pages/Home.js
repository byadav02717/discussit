import React from 'react'
import {Link} from "react-router-dom";
import '../css/Home.css';


export default function Home() {
    return (
        <div id="home">
            <img src="/student-image.jpg" alt="" />

         <div className = "container">
      <Link to="/register">
      <button className = "btn">Get Started</button>
          </Link>
       </div>
        </div>
    );
    
}
