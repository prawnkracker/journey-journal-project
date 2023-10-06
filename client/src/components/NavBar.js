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
            <NavLink
            to='/newtrip'
            exact
            className='navlink'
            >
            New Trip
            </NavLink>
        </nav>
    )
}

export default NavBar;