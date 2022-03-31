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
  var marker = new google.maps.Marker({
    position: {
      lat: lat,
      lng: lng,
    },
    map: map,
    icon: "https://img.icons8.com/color/28/location-off.png",
  });
});
