import React, { useState, useEffect } from 'react';
import useGeoLocation from './useGeoLocation';
import ClipLoader from "react-spinners/ClipLoader";
import PubNub from 'pubnub';
import { useHistory } from 'react-router-dom';
import axios from 'axios'

const AmbulanceHome = ()=>{
    const history = useHistory()
    const [loading,setloading] = useState(true)
    const [DriverDetails,storeDriverDetails] = useState([])
    const[BookingReq,setBookingReq] = useState({})
    const [AcceptedReq,setAcceptedReq] = useState([])
    
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
            var store = {}
            for(var key in data.BookingReq){
                var temdata = data.BookingReq[key]
                store[temdata._id] = [temdata.lat,temdata.lng,temdata.UserName]
            }
            console.log(store,'------------------???')
            setBookingReq(store)
            // setBookingReq(data.BookingReq)
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
    function distance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist;
        }
    }

    const ViewReq = async(UserName,driverName,AmbLat,AmbLng,UserLat,UserLng)=>{
        console.log("details to view map - ",AmbLat,AmbLng,UserLat,UserLng);
        history.push({
            pathname:'/AmbulanceMap',
            state:{
                AmbLat:AmbLat,
                AmbLng:AmbLng,
                UserLat:UserLat,
                UserLng:UserLng,
                UserName:UserName,
                driverName:driverName,
                UserEnd:true
            }
        })
    }

    const Reject = async(UserName,driverName)=>{
        console.log('rejected the req.',UserName,driverName)
        try{
            const res = await axios.post('/reject_request',{
                Headers:{'content-Type':'application/json'},
                json:true,
                body:{UserName:UserName,driverName:driverName}
            })
        
            console.log(res.data.message)
        }
        catch(err){
            console.log("rejection failed")
            console.log(err)
        }
    }
    return(
        <>
            <div>
                {loading?
                <div>
                    <h3 className='text-left p-4'>Ambulance Home</h3>
                    <div className='container'>
                        <div className='row'>
                            <div className='float-right  w-100 col-12'>
                                    <b>Your Location - </b>
                                {
                                    location.loaded ?
                                    JSON.stringify(location.coordinates)
                                    :
                                    <div  className='Loader'>
                                        <ClipLoader color={'#16f1cd'} loading={true} size={50}/>
                                        <p>Loading</p>
                                    </div>
                                }
                            </div>
                        </div>
                        
                    </div>
                    {
                        sendInput()
                    }
                    <div className='container'>
                        <br/>
                        <h5>Booking requests</h5>
                        <hr/>
                        <div className='float-left'>
                            <b>S.N.</b>
                            <b className='ml-5'>Name</b>
                        </div>
                        <b> Distance</b>
                        
                        <div className="float-right">
                            <b>Actions</b>
                        </div>
                        <hr/>
                        <ol>
                        {
                            Object.entries(BookingReq).map(([key,value])=>{
                                return(

                                <div key = {key}>
                                    <li>
                                    <div className='float-left ml-5'>
                                        <b>{value[2]}</b>
                                    </div>
                                    <b> {distance(location.coordinates.lat,location.coordinates.lng,value[0],value[1]).toString().substr(0,6)} KM</b>
                                    
                                    <div className="float-right">
                                        <button onClick={()=>ViewReq(value[2],DriverDetails.mail,location.coordinates.lat,location.coordinates.lng,value[0],value[1])} className='m-2 btn btn-primary'>View</button>
                                        <button onClick={()=>Reject(value[2],DriverDetails.mail)} className='m-2 btn btn-danger'>Reject</button>
                                    </div>
                                    </li>
                                    <br/>
                                    <hr/>
                                </div>
                                )
                            })
                        }
                        </ol>
                    </div>
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