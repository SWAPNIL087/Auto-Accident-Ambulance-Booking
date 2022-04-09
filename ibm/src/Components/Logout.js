import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


const Logout = ()=>{
    const history = useHistory()

    useEffect(()=>{
        fetch('/logout',{
            method:'GET',
            headers:{
                Accept:'application/json',
                "Content-Type":'application/json'
            },
            credentials:"include"
        }).then((res)=>{
            localStorage.removeItem('isLoggedIn')
            localStorage.setItem('isLoggedIn','false')
            history.push('/',{replace:true})
        }).catch((err)=>{
            console.log(err)
        })
    })

    return(
        <>
        </>
    )
}
export default Logout;