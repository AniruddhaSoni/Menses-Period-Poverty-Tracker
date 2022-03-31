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
    zoom: 7,
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

  var markers = new Array();
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
    markers.push(marker);
  }
  markers.forEach((i, index) => {
    var contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">' +
      latLon[index].name +
      "</h1 > " +
      '<div id="bodyContent">' +
      "<div>" +
      "<h3> Address </h3>" +
      "<p>" +
      latLon[index].address +
      "</p>" +
      "<h3> Phone </h3>" +
      "<p>" +
      latLon[index].address +
      "</p>" +
      "</div>";
    "</div>" + "</div>";
    var infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    i.addListener("click", () => {
      infowindow.open({
        anchor: i,
        map,
        shouldFocus: false,
      });
    });
  });
});
