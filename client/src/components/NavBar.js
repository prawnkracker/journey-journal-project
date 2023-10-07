import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

function NavBar({user, setUser}){
    const history = useHistory()
    function handleLogout(){
        fetch('/logout', { method: "DELETE"})
        .then((r) => {
            if (r.ok){
                setUser(null)
            }
        })
        .then(() => history.push('/'))
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
            <NavLink
            to={`/${user.username}`}
            exact
            className='user-navlink'
            >
            {user.username}
            </NavLink>

        </nav>
    )
}

export default NavBar;