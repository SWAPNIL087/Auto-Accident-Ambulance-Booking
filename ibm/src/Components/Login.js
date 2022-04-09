import React, { useState } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
const Login = ()=>{
    const history = useHistory()
    const [email,setemail] = useState()
    const[password,setpassword] = useState()

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
        }
    }

    return(
        <>
        <div className='container mt-5'>
            <div className='row col-lg-5 col-md-8 col-10 m-auto registration-box'>
            <div className='col-10 w-100 m-auto'>
                <h4 className='text-center text-success font-weight-bold m-0'>Login</h4>
                
            </div>
            <div className='col-10 w-100 m-auto'>
                <p className='text-left font-weight-bold m-0'>Email</p>
                <input onChange={(e)=>setemail(e.target.value)} className='float-left w-100' name='email' id='email' placeholder='enter email'></input>
            </div>
            <div className='col-10 w-100 m-auto'>
                <p className='text-left font-weight-bold m-0'>Password</p>
                <input onChange={(e)=>setpassword(e.target.value)}  type='password' className='float-left w-100' name='password' id='password' placeholder='enter password'></input>
            </div>
            <div className='col-10 p-2 w-100 m-auto'>
                <button onClick={login} className='btn btn-success rounded button'>Login</button>
            </div>
            </div>
        </div>
        </>
    )
}

export default Login 