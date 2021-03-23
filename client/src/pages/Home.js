import React from 'react'
import {Link} from "react-router-dom";
import '../css/Home.css';


export default function Home() {
    return (
        <div id="home">
         <div className = "container">
     
     <img src="/student-image.jpg" class="cover" alt=""/>
      <Link to="/login">
      <button className = "btn">Get Started</button>
          </Link>
       </div>
        </div>
    );
    
}
