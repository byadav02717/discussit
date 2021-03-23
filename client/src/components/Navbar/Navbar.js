import React, { Component } from 'react';
import { MenuItems } from "./MenuItems"
import { Button } from "../Button"
import './Navbar.css'
import { useHistory } from "react-router-dom";

import { NavLink } from 'react-router-dom';
import {Link} from "react-router-dom";


class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }
    

    render() {
        return(
            <div className="Nav-wraper">

            <nav className="NavbarItems">
      
                <h1 className="navbar-logo">Discuss it</h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                 <Link to="/register">
          <Button>
      Sign Up
    </Button>
     </Link>
            </nav>
            </div>
        )
    }
}

export default Navbar