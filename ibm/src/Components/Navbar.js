import React from 'react';
import { NavLink, useHistory,Redirect } from 'react-router-dom';

const Navbar = ()=>{
    var isloggedIn = localStorage.getItem('isLoggedIn');
    var isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
    console.log(isloggedIn)
    
    if(isloggedIn === 'true'){
        return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <NavLink className="nav-link" to="/Ambulance_Home">Home</NavLink>
                </li>
                {/* <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Login
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <NavLink class="dropdown-item" to="/login">Login as User</NavLink><br/>
                        <NavLink class="dropdown-item" to="/userLogin">Login as Driver</NavLink>
                    </div>
                </li> */}
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
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <NavLink className="nav-link" to="/User_Home">Home</NavLink>
                </li>
                {/* <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Login
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <NavLink class="dropdown-item" to="/login">Login as User</NavLink><br/>
                        <NavLink class="dropdown-item" to="/userLogin">Login as Driver</NavLink>
                    </div>
                </li> */}
                <li>
                    <NavLink className="nav-link" to="/logout">logout</NavLink>
                </li>
                </ul>
            </div>
        </nav>
        )
    }
    else{
        return(
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="#">Navbar</a>
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