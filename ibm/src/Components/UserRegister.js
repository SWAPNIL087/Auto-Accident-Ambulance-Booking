import React, {useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const User_Register = ()=>{
    const [name,setname] = useState()
    const [password,setpassword] = useState()
    const [mail,setmail] = useState()
    const [confirmp,setcp] = useState()
    
    const cpassword = (e)=>{
        if(e.target.value != password){
            $('.pass_msg').removeClass('d-none');
        }
        else{
            setcp(e.target.value)
            $('.pass_msg').addClass('d-none');
        }
    }

    const register_user = async(e)=>{
        e.preventDefault();
        if (mail==undefined || password==undefined || confirmp == undefined || name==undefined ){
            window.alert('All fields are required!')
        }
        else if(mail=='' || password=='' || confirmp == '' || name==''  ){
            window.alert('All fields are required!')
        }
        else{
            console.log('sending data to backend')
            var container = {
                mail:mail,
                name : name,
                password:password,
            }
            console.log(container)
            const res = await axios.post('/register_user',{
                Headers:{'content-Type':'application/json'},
                json:true,
                body:container
            })
            console.log(res)
        }
    }

    return(
        <>
        
        <form className='mt-5'>
            <div className='container'>
                <div className='row registration-box m-auto col-lg-8 col-md-8 col-10'>
                <div className='col-10 w-100 m-auto'>
                    <h4 className='text-center text-primary font-weight-bold m-0'>Register User</h4>
                </div>
                    <div className='col-10 p-2 w-100 m-auto'>
                        <p className='text-left font-weight-bold m-0'>Full Name</p>
                        <input onChange={(e)=>setname(e.target.value)} className='float-left w-100' name='name' id='name' placeholder='enter full name'></input>
                    </div>
                    <div className='col-10 p-2 w-100 m-auto'>
                        <p className='text-left font-weight-bold m-0'>Email</p>
                        <input onChange={(e)=>setmail(e.target.value)} className='float-left w-100' name='mail' id='mail' placeholder='enter email'></input>
                    </div>
                    <div className='col-10 p-2 w-100 m-auto'>
                        <p className='text-left font-weight-bold m-0'>Create-Password</p>
                        <input type='password' onChange={(e)=>setpassword(e.target.value)} className='float-left w-100' name='DL' id='DL' placeholder='password'></input>
                    </div>
                    <div className='col-10 p-2 w-100 m-auto'>
                        <small className='text-danger d-none pass_msg position-absolute'>password does not match</small>
                        <p className='text-left font-weight-bold m-0'>Confirm-password</p>
                        <input type='password' onChange={cpassword} className='float-left w-100' name='DL' id='DL' placeholder='confirm password'></input>
                    </div>
                    {/* <div className='col-10 p-2 w-100 m-auto'>
                        <button onClick={register_user} className='btn btn-primary rounded button'>Register</button>
                    </div> */}
                    <div className='row w-100 mt-4'>
                        <div className='col-5'>
                            <button onClick={register_user} className='btn btn-primary rounded button'>Register</button>    
                        </div>
                        <div className='col-5 mt-2'>
                            <span>already an user? <NavLink to="/userLogin" className='text-primary'>Login</NavLink ></span>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        </>
    )
}

export default User_Register