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

const  map = L.map("map").setView([0,0], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "OpenStreetMap Abhishek G",
}).addTo(map);

const markers = {};


socket.on("recieve-location", (data) => {
    const { id, latitude, longitude} = data;
    map.setView([latitude, longitude] );
    if(markers[id]){
        markers[id].setLatLng([latitude , longitude]);
    }
    else{
        markers[id] = L.marker([latitude , longitude]).addTo(map);
    }

});


socket.on("user-disconnected", (id) => {
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});