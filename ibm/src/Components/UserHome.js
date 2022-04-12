import React, { useEffect, useState } from 'react';
import useGeoLocation from './useGeoLocation';
import SimpleMap from './Map';
import PubNub from 'pubnub';
import axios from 'axios'

const UHome = ()=>{
    const [data,setdata] = useState({})
    const location = useGeoLocation();
    
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

    const BookAmbulance = async(key,lat,lng)=>{
        console.log(key)
        const res = await axios.post('/bookAmbulance',{
            Headers:{'content-Type':'application/json'},
            json:true,
            body:{key:key,lat:lat,lng:lng}
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
        </>
    )
}

export default UHome; 