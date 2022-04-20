import React, { useState } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
const Login = ()=>{
    const history = useHistory()
    const [email,setemail] = useState()
    const[password,setpassword] = useState()
    const [message,setMessage] = useState('')

    const login = async(e)=>{
        e.preventDefault()
        if (email=='' || email==undefined || password=='' || password==undefined){
            window.alert('All fields are required!')
        }
        else{
            console.log('logging in ')
            const res = await axios.post('/login',{
                Headers:{'content-Type':'application/json'},
                json:true,
                body:{email:email,password:password}
            })
        
            console.log(res.data.message)
            if (res.data.message === 'login successfull!'){
                localStorage.setItem('isLoggedIn','true')
                history.push('/Ambulance_Home')
            }
            else{
                setMessage("Invalid credentials Please Try again!")
            }
        }
    }

    return(
        <>
        <div className='container' style={{marginTop:"10%"}}>
            <div className='row col-lg-5 col-md-8 col-10 m-auto registration-box'>
            <div className='col-10 w-100 m-auto'>
                <h4 className='text-center text-success font-weight-bold m-0'>Ambulance Login</h4>
                <alert className='text-danger'>{message}</alert>
            </div>
            <div className='col-10 w-100 m-auto'>
                <p className='text-left font-weight-bold m-0'>Email</p>
                <input onChange={(e)=>setemail(e.target.value)} className='float-left w-100' name='email' id='email' placeholder='enter email'></input>
            </div>
            <div className='col-10 w-100 m-auto'>
                <p className='text-left font-weight-bold m-0'>Password</p>
                <input onChange={(e)=>setpassword(e.target.value)}  type='password' className='float-left w-100' name='password' id='password' placeholder='enter password'></input>
            </div>
            <div className='row w-100 mt-4'>
                <div className='col-5 '>
                    <button onClick={login} className='btn btn-success rounded button'>Login</button>
                </div>
                <span className='col-5 mt-2'>New user? <NavLink to="/ambulance_register" className="text-success">Register</NavLink></span>
            </div>
            </div>
        </div>
        </>
    )
}

export default Login 