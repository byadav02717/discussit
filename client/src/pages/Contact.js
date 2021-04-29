import React from 'react'
import '../css/About.css';

/*
functional component Contact is the layout for contact page. It uses About.css file for styling the page.
It has the list of contact email of developers and maintenance team of the website.
*/

export default function Contact() {
    return (
        <div className="container">
            <div className="row">
                <h1>Contact Us</h1> 
            <div className="row">  
                <h3>For any questions, please feel free to email us at any of the addresses below.</h3>
                
                   <div className="row">
                <div className="col s6">
                    <div className = "list">
                    <h4> bivash.yadav@mavs.uta.edu</h4>
                    <h4> jose.ibarra5@mavs.uta.edu</h4>
                    <h4> myles.guiam@mavs.uta.edu</h4>
                    <h4> noah.walker@mavs.uta.edu</h4>
                   </div>
                </div>
                <div className="col s6">
                    <img src="/mail.png" alt="" className="mail" />
                </div>
            </div>
            </div>
            </div>
        </div>
    )
}
