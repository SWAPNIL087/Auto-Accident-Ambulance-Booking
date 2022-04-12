import React, { useEffect, useState } from 'react';
import useGeoLocation from './useGeoLocation';
import SimpleMap from './Map';
import PubNub from 'pubnub';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

const UHome = ()=>{
    const [data,setdata] = useState({})
    const location = useGeoLocation();
    const [loading,setloading] = useState(true);
    
    const history = useHistory()

    useEffect(async()=>{
        setloading(false)
        console.log("custom load called")
        try{
            const res = await fetch('/user_login',{
                method:'GET',
                headers:{
                    Accept: "application/json",
                    "Content-Type":"application/json"
                },
                json:true,
                credentials:"include"
            })

            const data = await res.json()
            if (!res.status===200 || !data){
                const error = new Error(res.error);
                history.push('/userLogin')
                throw error;
            } 
            setloading(true)
        }
        catch(err){
            console.log(err)
            console.log('invalid user')
            history.push('/userLogin')
        }
    },[])

    console.log(location,'the location here .......');
    var pubnub = new PubNub({
        publishKey: 'pub-c-b24c62a8-9d96-487d-b7f0-22637f9404a3',
        subscribeKey: 'sub-c-c5db0af2-2e9f-11ec-83d0-f27e7ede0273',
    });

    // let final_Alocs = []
    pubnub.subscribe({
        channels:['Locations']
    });

    pubnub.addListener({
        message:function(m){
            var driverName = m.message.data.driverDetails.name
            var DriverLicense = m.message.data.driverDetails.Dl
            var tem = {}
            tem[m.message.data.driverDetails.mail]=[driverName,DriverLicense]
            console.log(tem)
            setdata(tem)
        }
    })

    const BookAmbulance = async(mail,lat,lng)=>{
        console.log(mail) 
        const res = await axios.post('/bookAmbulance',{
            Headers:{'content-Type':'application/json'},
            json:true,
            body:{mail:mail,lat:lat,lng:lng}
        })
    
        console.log(res.data.message)
        // if (res.data.message === 'login successfull!'){
        //     localStorage.setItem('isLoggedIn','true')
        //     history.push('/Ambulance_Home')
        // }
    }

    return(
        <>
        {
            loading?
            <div>
                {
            location.loaded?
            <div>
                <h3 className='text-success'>
                    Welcome To Fast Ambulance
                </h3>
                <br></br>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6 col-12 border map'>
                            <SimpleMap lat={location.coordinates.lat} log={location.coordinates.lng}/>
                        </div>
                    
                        <div className='col-lg-6 col-12 mt-4'>
                            <h5>Ambulances near you</h5>
                            <hr/>
                            <ol>
                            {
                                Object.entries(data).map(([key,value])=>{
                                    return (
                                        <div class="container" key = {key}>
                                            
                                                <li className="text-left m-0">
                                                        <div className='row'>
                                                            <div className='col-8'>
                                                                <span><b>DriverName</b> - {value[0]}</span><br></br>
                                                                <span><b> DriverLicense</b> - {value[1]}</span>
                                                            </div>
                                                            <div className='text-center col-4 mt-2'>
                                                                <button onClick={()=>BookAmbulance(key,location.coordinates.lat,location.coordinates.lng)} className='btn btn-primary'> Book</button>
                                                            </div>
                                                        </div>
                                                </li>
                                        </div>
                                    );
                                  })
                            }
                            </ol>
                        </div>
                    </div>

                </div>
            </div>
            :
            <div>
                <h1>Loading......</h1>
            </div>
        }
            </div>
            :
            <div  className='Loader'>
                <ClipLoader color={'#16f1cd'} loading={true} size={50}/>
                <p>Loading</p>
            </div>
        }
        
        </>
    )
}

export default UHome; 