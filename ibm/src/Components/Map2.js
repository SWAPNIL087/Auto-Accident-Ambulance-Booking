import React, { useState, useEffect } from 'react';
import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet';
import { NavLink, useLocation } from "react-router-dom";
import RoutineMachine from "./RoutineMachine";


const SimpleMap2 = (props) => {
    const location = useLocation()

    const [userLat,setUserLat] = useState(location.state.UserLat)
    const [userLon,setUserLon] = useState(location.state.UserLng)
    const [AmbLat,setAmbLat] = useState(location.state.AmbLat)
    const [AmbLng,setAmbLng] = useState(location.state.AmbLng)

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
                <button className='btn btn-success m-2'>Accept Booking</button>
                <NavLink className='btn btn-info m-2' to="/ambulance_home">Go Back</NavLink>
              </div>
          </div>
    
    </div>
  );
};

export default SimpleMap2;

