import React, { useState, useEffect } from 'react';
import useGeoLocation from './useGeoLocation';
import ClipLoader from "react-spinners/ClipLoader";
import PubNub from 'pubnub';
import { useHistory } from 'react-router-dom';



const AmbulanceHome = ()=>{
    const history = useHistory()
    const [loading,setloading] = useState(true)
    const [DriverDetails,storeDriverDetails] = useState([])
    const customLoad = async()=>{
        setloading(false)
        console.log("custom load called")
        try{
            const res = await fetch('/Ambulance_login',{
                method:'GET',
                headers:{
                    Accept: "application/json",
                    "Content-Type":"application/json"
                },
                json:true,
                credentials:"include"
            })

            const data = await res.json()
            console.log(data,"current debigging for driver's details dl name")
            if (!res.status===200 || !data){
                const error = new Error(res.error);
                history.push('/')
                throw error;
            } 
            storeDriverDetails(data)
            setloading(true)
        }
        catch(err){
            console.log(err)
            console.log('invalid user')
            history.push('/')
        }

    }
    useEffect(async()=>{
        customLoad();
    },[])
    const location = useGeoLocation();
    
    var pubnub = new PubNub({
        publishKey: 'pub-c-b24c62a8-9d96-487d-b7f0-22637f9404a3',
        subscribeKey: 'sub-c-c5db0af2-2e9f-11ec-83d0-f27e7ede0273',
    });

    function sendmessage(txt){
        console.log(txt,'????')
        var container = {"location":txt,"driverDetails":DriverDetails}
        // setInterval(() => {
            console.log('published the current location')
            pubnub.publish({
                channel:'Locations',
                message:{
                    data:container
                }
            })
        // }, 5000);
        
    }

    // pubnub.addListener({
    //     message:function(m){
    //         console.log('location shared!')
    //         // document.getElementById("newMessage").innerHTML+="<br>"+m.message.text;
    //     }
    // })

    pubnub.subscribe({
        channels:['Locations']
    });

    function sendInput(){
        var tem = DriverDetails.mail +'-'+ location.coordinates.lat + '-' + location.coordinates.lng
        // console.log(tem)
        if (location.coordinates.lat !='' && location.coordinates.lng !=''){
            console.log(tem)
            sendmessage(tem)
         }
    }

    return(
        <>
            <div>
                {loading?
                <div>
                    <h1>Ambulance Home</h1>
                    <div>
                        {
                            location.loaded?JSON.stringify(location):
                            <div  className='Loader'>
                                <ClipLoader color={'#16f1cd'} loading={true} size={50}/>
                                <p>Loading</p>
                            </div>
                        }
                    </div>
                    {
                        sendInput()
                    }
                </div>
                :
                <div  className='Loader'>
                    <ClipLoader color={'#16f1cd'} loading={true} size={50}/>
                    <p>Loading</p>
                </div>
                }
            </div>
        </>

    )
}

export default AmbulanceHome