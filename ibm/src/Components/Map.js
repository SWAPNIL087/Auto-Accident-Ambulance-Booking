import React, { useState, useEffect } from 'react';
import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet';
import L from 'leaflet';
import Ambulance from './Images/Ambulance.png'
import PubNub from 'pubnub';


const SimpleMap = (props)=>{
    const [userLat,setUserLat] = useState(props.lat)
    const [userLon,setUserLon] = useState(props.log)
    const [ambulance_locations,setAL] = useState([])
    var pubnub = new PubNub({
        publishKey: 'pub-c-b24c62a8-9d96-487d-b7f0-22637f9404a3',
        subscribeKey: 'sub-c-c5db0af2-2e9f-11ec-83d0-f27e7ede0273',
    });


    pubnub.addListener({
        message:function(m){
            var tem = m.message.text.split('-')
            var arr = ambulance_locations
            var c = arr.indexOf(tem)
            console.log(c,tem)
            if (c == -1){
                arr.push(tem)
                setAL([...ambulance_locations,arr])
                console.log(tem,'/////////')
                document.getElementById("newMessage").innerHTML+="<br>"+m.message.text;
            }
        }
    })

    pubnub.subscribe({
        channels:['Locations']
    });
    
    // let ambulance_locations = [[23.116444 ,83.196121],[23.113333,83.200556]]

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

    let final_Alocs = []
    for (var i=0;i<ambulance_locations.length;i++){
        var lat = ambulance_locations[i][0];
        var long = ambulance_locations[i][1];
        var x = distance(userLat,userLon,lat ,long,'K')
        // console.log(x)
        if (x<=5){
            final_Alocs.push([lat,long])
        }
        // console.log(final_Alocs)
        
    }

    // console.log(final_Alocs)


    const mapNodeIcon = L.divIcon({
        html: `<div style="display: flex;">
          <img src="${Ambulance}" width="45px"/> 
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