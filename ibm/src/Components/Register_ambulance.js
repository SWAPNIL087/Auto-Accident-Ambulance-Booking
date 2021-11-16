import React, {useState } from 'react';
import $ from 'jquery';
import axios from 'axios';

const A_Register = ()=>{
    const [name,setname] = useState()
    const [age,setage] = useState()
    const [Dl,setDl] = useState()
    const [password,setpassword] = useState()
    const [confirmp,setcp] = useState()
    const [mail,setmail] = useState()

    const cpassword = (e)=>{
        if(e.target.value != password){
            $('.pass_msg').removeClass('d-none');
        }
        else{
            setcp(e.target.value)
            $('.pass_msg').addClass('d-none');
        }
    }

    const register_amb = async(e)=>{
        e.preventDefault();
        if (mail==undefined || password==undefined || confirmp == undefined || name==undefined || age == undefined || Dl == undefined ){
            window.alert('All fields are required!')
        }
        else if(mail=='' || password=='' || confirmp == '' || name=='' || age == '' || Dl == '' ){
            window.alert('All fields are required!')
        }
        else{
            console.log('sending data to backend')
            var container = {
                mail:mail,
                name : name, 
                age : age,
                Dl : Dl,
                password:password,
            }
            console.log(container)
            const res = await axios.post('/register_A',{
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
                    <h4 className='text-center text-success font-weight-bold m-0'>Register Ambulance</h4>
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
                        <p className='text-left font-weight-bold m-0'>Age</p>
                        <input onChange={(e)=>setage(e.target.value)} className='float-left w-100' name='Age' id='Age' placeholder='enter Age'></input>
                    </div>
                    <div className='col-10 p-2 w-100 m-auto'>
                        <p className='text-left font-weight-bold m-0'>Driving License No.</p>
                        <input onChange={(e)=>setDl(e.target.value)} className='float-left w-100' name='DL' id='DL' placeholder='enter Driving license number'></input>
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
                    <div className='col-10 p-2 w-100 m-auto'>
                        <button onClick={register_amb} className='btn btn-success rounded button'>Register</button>
                    </div>
                </div>
            </div>
        </form>
        </>
    )
}

export default A_Register