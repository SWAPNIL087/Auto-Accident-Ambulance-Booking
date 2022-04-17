import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import Ambulance from './Images/Ambulance.png'



const createRoutineMachineLayer = (props) => {
    console.log(props.UserLat,props.UserLng,props.AmbLat,props.AmbLng)

    const greenIcon = L.divIcon({
      html: `<div style="display: flex;">
        <img src="${Ambulance}" width="45px"/> 
      </div>`,
      iconAnchor: [10, 10],
      popupAnchor: [0, -19],
      shadowSize:   [50, 64],
      shadowAnchor: [4, 62],
    });

    var redIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

  const instance = L.Routing.control({
    waypoints: [
      L.latLng(props.AmbLat, props.AmbLng),
      //   L.latLng(23.2243169 ,77.5014527),
      L.latLng(props.UserLat, props.UserLng)
    ],
    createMarker: function(i, wp, nWps) {
    if (i === 0) {
      // here change the starting and ending icons
      return L.marker(wp.latLng, {
        icon: greenIcon // here pass the custom marker icon instance
      });
    } else {
      // here change all the others
      return L.marker(wp.latLng, {
        icon: redIcon
      });
    }
  },
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }]
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
