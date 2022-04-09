import React, { useEffect, useState } from 'react';
import useGeoLocation from './useGeoLocation';
import SimpleMap from './Map';
import PubNub from 'pubnub';

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
            // console.log("listening driver details.....",m.message.data.driverDetails)
            var driverName = m.message.data.driverDetails.name
            var DriverLicense = m.message.data.driverDetails.Dl
            // console.log(driverName,DriverLicense)
            var tem = {}
            tem[driverName]=DriverLicense
            console.log(tem)
            setdata(tem)
        }
    })

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
                            {
                                Object.entries(data).map(([key,value])=>{
                                    return (
                                        <div>
                                            <ol className='bg-warning'>
                                                <li className="text-left">
                                                    <span>DriverName - {key}</span><br></br>
                                                    <span> DriverLicense - {value}</span>
                                                </li>
                                            </ol>
                                        </div>
                                    );
                                  })
                            }
                            
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