import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({setUser}){
    function handleLogout(){
        fetch('/logout', { method: "DELETE"})
        .then((r) => {
            if (r.ok){
                setUser(null)
            }
        })
    }
    
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
            <NavLink
            to='/newreview'
            exact
            className='navlink'
            >
            New Review
            </NavLink>
            <button onClick={handleLogout}>
                Logout
            </button>
        </nav>
    )
}

export default NavBar;