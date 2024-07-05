const socket = io();      // initialize socket io with the help of this connection request go to the backend 

if(navigator.geolocation){                  // navigator(object) is available in window 
  navigator.geolocation.watchPosition((position) => {
    const {latitude, longitude} = position.coords;
    socket.emit("send-location", {latitude, longitude});

}, (error)=>{
    console.error(error);
},
{
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
}
);
}

Location.map("map").setView([0,0], 10);

Location.titleLayer()