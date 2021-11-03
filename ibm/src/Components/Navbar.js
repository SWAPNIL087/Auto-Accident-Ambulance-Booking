import React from 'react';
import { NavLink, useHistory,Redirect } from 'react-router-dom';

const Navbar = ()=>{
    return(
    <>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                </li>
                <li class="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li class="nav-item">
                <NavLink className="nav-link" to="/ambulance_register">Register</NavLink>
                </li>
                </ul>
            </div>
        </nav>
    </>)
}

export default Navbar; 