import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
    console.log(props.UserLat,props.UserLng)
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(props.AmbLat, props.AmbLng),
      //   L.latLng(23.2243169 ,77.5014527),
      L.latLng(props.UserLat, props.UserLng)
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }]
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
