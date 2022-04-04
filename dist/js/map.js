import womenNgos from "./data.js";

const latLon = womenNgos.ngoDetails;

navigator.geolocation.getCurrentPosition((position) => {
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
    console.log(i);
    var contentString = `
      <section id="infowindow">
        <div class="container">
            <div class="card">
                <div class="card-body py-5 px-4">
                    <h2 class="text">NGO's Name</h2>
                    <h6 class="card-title text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h6>
                    <footer class="footer text-muted pt-2"></footer>
                    <h6 class="phone pt-3"><i class="bi bi-telephone"></i></i>Phone</h6>
                    <p class="card-text text-muted">9001434984</p>
                    <h6 class="address pt-3"><i class="bi bi-geo"></i>Address</h6>
                    <p class="card-text text-muted">Shree Hari Marg 145, थिरबम सडक, 44600, Nepal</p> 
                    <a href="#" class="btn btn-teal"><i class="bi bi-signpost-split"></i>Directions</a>
                </div>
            </div>
        </div>
     </section>

      `;
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
