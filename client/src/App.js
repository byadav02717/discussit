import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import "./css/Home.css"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Registersucess from './pages/Registersucess';
import Dashboard from './pages/Dashboard';

function App() {
  return ( <Router>
    <div className="navbar">
  <nav>
  <div className="nav-wrapper">
    <li className="brand-logo"><Link to="/">DiscussIt</Link></li>
    <ul id="nav-mobile" className="right hide-on-med-and-down">
       
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>       
       
      
    </ul>
  </div>
</nav>
<Switch>
    <Route path="/" component={Home} exact/>
    <Route path="/about" component={About}/>
    <Route path="/contact" component={Contact}/>
    <Route path="/login" component={Login}/>
    <Route path="/register" component={Register}/>
    <Route path="/registersucess" component = {Registersucess}/>
    <Route path="/dashboard" component = {Dashboard} />
</Switch>
  
</div>
</Router>

    
  );
}

export default App;
