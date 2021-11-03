import React, { useState, useEffect } from 'react';
import useGeoLocation from './useGeoLocation';
import PubNub from 'pubnub';


const AmbulanceHome = ()=>{
    const location = useGeoLocation();
    
    var pubnub = new PubNub({
        publishKey: 'pub-c-b24c62a8-9d96-487d-b7f0-22637f9404a3',
        subscribeKey: 'sub-c-c5db0af2-2e9f-11ec-83d0-f27e7ede0273',
    });

    function sendmessage(txt){
        console.log(txt,'????')
        pubnub.publish({
            channel:'Locations',
            message:{
                text:txt
            }
        })
    }

    pubnub.addListener({
        message:function(m){
            console.log('location shared!')
            // document.getElementById("newMessage").innerHTML+="<br>"+m.message.text;
        }
    })

    pubnub.subscribe({
        channels:['Locations']
    });

    function sendInput(){

        var tem = location.coordinates.lat + '-' + location.coordinates.lng
        console.log(tem)
        sendmessage(tem)
    }

    return(
        <>
            <h1>Ambulance Home</h1>
            <div>
                {
                    location.loaded?JSON.stringify(location):"Location not available"
                }
            </div>
            {
                sendInput()
            }
            
        </>

    )
}

export default AmbulanceHome