import React, { useState, useEffect } from 'react';
import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet';
import L from 'leaflet';
import Ambulance from './Images/Ambulance.png'
import PubNub from 'pubnub';


const SimpleMap = (props)=>{
    
    const [userLat,setUserLat] = useState(props.lat)
    const [userLon,setUserLon] = useState(props.log)
    const [ambulance_locations,setAL] = useState({})
    const [locations,setlocations] = useState([])

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
            console.log("listening.....")
            var location_shared = m.message.data.location.split('-')
            var arr = ambulance_locations
            // var c = arr.indexOf(location_shared)
            if (location_shared[0]!=undefined && location_shared[1]!='' && location_shared[2]!=''){
                arr[location_shared[0]]=[location_shared[1],location_shared[2]]
                console.log(arr,'the arr destructured to ambulance_locations')
                setAL([...ambulance_locations,arr])
            }            
        }
    })
    
    let final_Alocs = []

    for(var key in ambulance_locations){
        console.log('------------------------------------')
        console.log(key + " " + ambulance_locations[key]);
        var lat = ambulance_locations[key][0];
        var long = ambulance_locations[key][1];
        console.log("lat => ",lat," long => ",long)
        var x = distance(userLat,userLon,lat ,long,'K')
        if (x<=5){
            final_Alocs.push([lat,long])
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

    
    const mapNodeIcon = L.divIcon({
        html: `<div style="display: flex;">
          <img src="${Ambulance}" height="35px" width="35px"/> 
        </div>`,
        iconAnchor: [10, 10],
        popupAnchor: [0, -19],
        shadowSize:   [50, 64],
        shadowAnchor: [4, 62],
      });

    return (
        <>
        <MapContainer className='m-auto' center={[userLat,userLon]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[userLat,userLon]}>
                <Popup>
                    Your location!
                </Popup>
            </Marker>
            {
                final_Alocs.map((i,idx)=>{
                    return(
                        <div key='idx'>
                    <Marker position={[i[0] ,i[1]]} icon={mapNodeIcon}>
                        <Popup>
                            Ambulance-{idx+1}  location.
                        </Popup>
                    </Marker>

                    </div>
                    )
                })
            }
        </MapContainer>
    
        </>

    )
}

export default SimpleMap;