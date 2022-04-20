import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


const LogoutUser = ()=>{
    const history = useHistory()

    useEffect(()=>{
        fetch('/logoutUser',{
            method:'GET',
            headers:{
                Accept:'application/json',
                "Content-Type":'application/json'
            },
            credentials:"include"
        }).then((res)=>{
            localStorage.removeItem('isLoggedIn')
            localStorage.setItem('isLoggedIn','false')
            localStorage.removeItem('isUserLoggedIn')
            localStorage.setItem('isUserLoggedIn','false')
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
export default LogoutUser;