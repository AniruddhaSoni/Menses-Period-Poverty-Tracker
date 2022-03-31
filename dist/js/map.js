import womenNgos from "./data.js";

const latLon = womenNgos.ngoDetails;

navigator.geolocation.getCurrentPosition(function (position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;

  const map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: lat,
      lng: lng,
    },
    zoom: 15,
  });
  var mylocation = new google.maps.Marker({
    position: {
      lat: lat,
      lng: lng,
    },
    map: map,
    icon: "https://img.icons8.com/color/28/location-off.png",
    title: "Your Location",
  });

  for (var i = 0; i < latLon.length; i++) {
    var lat = latLon[i].lat;
    var lon = latLon[i].lon;
    var marker = new google.maps.Marker({
      position: {
        lat: lat,
        lng: lon,
      },
      map: map,
    });
  }
});
