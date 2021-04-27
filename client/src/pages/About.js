import React from 'react'
import '../css/About.css';
/*
functional componenet About is the layout for About page.
It is gridview of images and description related to purpose of the website

*/
export default function About() {
    return (
        <div className="container">
            <div className="row">
                <div className= "Title">
                    <h1>About Us</h1> 
                    </div>
            </div>
            <div className="row">
                <div className="statement">
                    <h4>DiscussIt is a new, independent classroom tool designed to streamline communication between teachers and students.</h4>
                </div>
            </div>
            <div className="row">
                <div className="col s6">
                     <img src="/Qa.jpg" alt="" className="Qa" />
                </div>
                <div className="col s6">
                    <h5>Free Q&A Format</h5>
                    <p>Users have to ability to post questions that can be answered by the entire class. Giving all students the ability to contribute in a meaningful way, and best of all everything is completely free.</p>
                </div>
            </div>
            <div className="row">
                <div className="col s6">
                    <h5>Customized Groups</h5>
                    <p>Groups are created by teachers and have the ability to customize them as they see fit with custom tags for questions and complete control over who has access to the group.</p>
                </div>
                <div className="col s6">
                    <img src="/groups.jpg" alt="" className="Gr" />
                </div>
            </div>
            <div className="row">
                <div className="col s6">
                     <img src="/UI.jpg" alt="" className="UI" />
                </div>
                <div className="col s6">
                    <h5>Streamlined UI</h5>
                    <p>User interface is streamlined allow easy access to all of our groups and to find specific questions quickly.</p>
                </div>
            </div>
        </div>
    )
}
