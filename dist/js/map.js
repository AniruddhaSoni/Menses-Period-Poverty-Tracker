import womenNgos from "./data.js";

const latLon = womenNgos.latlong;

var allDistance = new Array();

function calcRoute(start, end, map) {
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
  };

  // defining directionServices
  var directionsService = new google.maps.DirectionsService();

  // defining directionsDisplay
  var directionsDisplay = new google.maps.DirectionsRenderer();
  // set the directions renderer to display the directions
  directionsDisplay.setMap(map);

  directionsService.route(request, function (result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      var distance = result.routes[0].legs[0].distance.value;
      allDistance.push(distance);
    }
  });
}
function compareRoute(start, end, map, smallestDistance) {
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
  };

  // defining directionServices
  var directionsService = new google.maps.DirectionsService();

  // defining directionsDisplay
  var directionsDisplay = new google.maps.DirectionsRenderer();
  // set the directions renderer to display the directions
  directionsDisplay.setMap(map);

  directionsService.route(request, function (result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      if (result.routes[0].legs[0].distance.value <= smallestDistance) {
        //show route on map
        directionsDisplay.setDirection(result);
      }
    }
  });
}

navigator.geolocation.getCurrentPosition(function (position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  var map = new google.maps.Map(document.getElementById("map"), {
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

  console.log(womenNgos);

  (async function iif() {
    for (var i = 0; i < latLon.length; i++) {
      var lat = latLon[i].lat;
      var lon = latLon[i].lon;
      var marker = new google.maps.Marker({
        position: {
          lat: lat,
          lng: lon,
        },
        map: map,
        title:
          "< h3 >< /h3>< p >" +
          womenNgos.latlong[i].lat +
          "< /p>< p >" +
          womenNgos.latlong[i].lon +
          "< /p>",
      });

      calcRoute(mylocation.position, marker.position, map);
    }
  })();

  setTimeout(() => {
    var smallestDistance = Math.min(...allDistance);

    for (var i = 0; i < latLon.length; i++) {
      var lat = latLon[i].lat;
      var lon = latLon[i].lon;
      compareRoute(
        mylocation.position,
        { lat: lat, lng: lon },
        map,
        smallestDistance
      );
    }
  }, 2000);
});
