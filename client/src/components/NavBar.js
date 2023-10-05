import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(){
    return (
        <nav className="navbar">
            <NavLink
            to='/'
            exact
            className='navlink'
            >
            Home
            </NavLink>
            <NavLink
            to='/trips'
            exact
            className='navlink'
            >
            Trips
            </NavLink>
        </nav>
    )
}

export default NavBar;