import React from 'react'
import {Link} from "react-router-dom";
import '../css/Home.css';


export default function Home() {
    return (
        <div className="home">
         <div className = "container">
     
      <Link to="/login">
      <button className = "btn">Get Started</button>
          </Link>
       </div>
        </div>
    );
    
}
