import React from 'react';
import { NavLink, useHistory,Redirect } from 'react-router-dom';
import Logo from './Images/Logo.png'

const Navbar = ()=>{
    var isloggedIn = localStorage.getItem('isLoggedIn');
    var isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
    console.log(isloggedIn)
    
    if(isloggedIn === 'true'){
        return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#"><img height="25px" width="50px" src={Logo}></img> FastAmbulance</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <NavLink className="nav-link" to="/Ambulance_Home">Home</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/logout">logout</NavLink>
                </li>
                </ul>
            </div>
        </nav>
        )
    }
    else if (isUserLoggedIn==='true'){
        return(
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#"><img height="25px" width="50px" src={Logo}></img> FastAmbulance</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <NavLink className="nav-link" to="/User_Home">Home</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/logoutUser">logout</NavLink>
                </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <b className='text-light'>Welcome {localStorage.getItem('UserName')}</b>
                </ul>
            </div>
        </nav>
        )
    }
    else{
        return(
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="#"><img height="25px" width="50px" src={Logo}></img> FastAmbulance</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
    
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Login
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="/userLogin">As User</a>
                            <a class="dropdown-item" href="/login">As Ambulance Driver</a>
                        </div>
                    </div>
                    </ul>
                </div>
            </nav>
        </>)}
}

export default Navbar; 