import React, { useState, useEffect } from 'react';
import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet';
import { NavLink, useHistory, useLocation } from "react-router-dom";
import RoutineMachine from "./RoutineMachine";
import axios from 'axios'


const SimpleMap2 = (props) => {
    
    const location = useLocation()
    const history = useHistory()

    console.log("opening the map section now......",location.state.UserEnd)
    console.log(location.state.UserLat,location.state.UserLng,location.state.AmbLat,location.state.AmbLng)


    const [userLat,setUserLat] = useState(location.state.UserLat)
    const [userLon,setUserLon] = useState(location.state.UserLng)
    const [AmbLat,setAmbLat] = useState(location.state.AmbLat)
    const [AmbLng,setAmbLng] = useState(location.state.AmbLng)
    const [BoolReqAccept,setBoolReqAccept] = useState(false)
    const [UserEnd,setUserEnd] = useState(location.state.UserEnd)

    const acceptRequest = async()=>{
        console.log("accept the booking.............");
        const res = await axios.post('/accept_request',{
            Headers:{'content-Type':'application/json'},
            json:true,
            body:{UserName:location.state.UserName,driverName:location.state.driverName}
        })
    
        console.log(res.data.message)
        if(res.data.message === 'Accepted'){
            console.log('success')
            setBoolReqAccept(true)
        }
    }

    const completeBooking = async()=>{
        console.log("complete booking and do necessary changes in backend")
        console.log("turned the status to enable book button again")

        const res = await axios.post('/complete_trip',{
            Headers:{'content-Type':'application/json'},
            json:true,
            body:{UserName:location.state.UserName,driverName:location.state.driverName}
        })
    
        console.log(res.data.message)
        if(res.data.message === 'completed'){
            history.push('/User_Home')
        }

    }
    


  return (
      <div className='container'>
          <div className='row mt-5'>
              <div className='col-lg-8 col-md-10 col-12 m-auto'>
              <MapContainer
                doubleClickZoom={false}
                id="mapId"
                zoom={5}
                center={[AmbLat,AmbLng]}
                >
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                    attribution="Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri"
                />
                <RoutineMachine UserLat={userLat} UserLng={userLon} AmbLat={AmbLat} AmbLng={AmbLng}/>
                </MapContainer>
              </div>
              <div className='col-lg-4 col-md-6 col-12 m-auto box border'>

                  {
                      
                      BoolReqAccept ?
                        <>
                            {
                                UserEnd ?
                                        <b></b>
                                    :
                                        <div>
                                            <b className='text-success'> Accepted the request</b><br/>
                                        </div>
                            }
                        </>
                        :
                            <>
                                {UserEnd ?
                                <>
                                <button onClick={()=>acceptRequest()} className='btn btn-success m-2'>Accept Booking</button>
                                </>

                                    :
                                <>
                                <b className='text-danger'>Confirmed booking map</b>
                                <br></br>
                                </>
                                }
                            </>
                  }

                  {
                      UserEnd?
                      <>
                         <NavLink className='btn btn-info m-2' to="/ambulance_home">Go Back</NavLink>
                      </>
                      :
                      <>
                          {/* User End to go back to home page */}
                          <button className='btn btn-warning m-2' onClick={()=>completeBooking()}>Complete booking</button>
                
                          <NavLink className='btn btn-info m-2' to="/User_Home">Go Back </NavLink>
                      </>
                  }
              </div>
          </div>
    </div>
  );
};

export default SimpleMap2;

