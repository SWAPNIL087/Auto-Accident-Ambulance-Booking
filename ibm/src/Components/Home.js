import React from 'react'
import { NavLink, useHistory,Redirect } from 'react-router-dom';

const Home = ()=>{
    return(
        <>
        <p>Home</p>
        <button className='m-0 p-0 border-0'>
        <NavLink className="nav-link btn btn-info" to="/User_Home"><span className='text-light'>Book an ambulance</span></NavLink>
        </button>
        </>
    )
}

export default Home