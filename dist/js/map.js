import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import firebaseConfig from "./firebase.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

var lat;
var lng;
var center;

const map = new google.maps.Map(document.getElementById("map"), {
  center: {
    lat: 40.99406898232663,
    lng: 45.65846879585445,
  },
  zoom: 7,
});

navigator.geolocation.watchPosition((position) => {
  lat = position.coords.latitude;
  lng = position.coords.longitude;

  const myLocation = new google.maps.Marker({
    position: {
      lat,
      lng,
    },
    map,
    icon: "https://img.icons8.com/officexs/48/center-direction.png",
  });

  center = new google.maps.LatLng(lat, lng);

  map.panTo(center);
});

async function setMarkers() {
  var markers = new Array();
  // var markers = [];

  const ngoData = await getDocs(collection(db, "users")).catch(() => {
    location.reload();
  });
  await ngoData.forEach((data) => {
    data = data.data();

    let lat = data.coordinates.latitude;
    let lng = data.coordinates.longitude;

    let marker = new google.maps.Marker({
      position: {
        lat,
        lng,
      },
      map,
    });
    markers.push(marker);
  });
  let i = 0;
  await ngoData.forEach((data) => {
    let marker = markers[i];
    data = data.data();

    var contentString = `
    <section id="infowindow">
      <div class="container">
          <div class="card">
              <div class="card-body py-5 px-4">
                  <h2 class="text">${data.name}</h2>
                  <h6 class="card-title text-muted">
                  ${`Organization`}</h6>
                  <footer class="footer text-muted pt-2"></footer>
                  <h6 class="phone pt-3"><i class="bi bi-telephone"></i></i>Phone</h6>
                  <p class="card-text text-muted">${data.contact.phone}</p>
                  <h6 class="address pt-3"><i class="bi bi-geo"></i>Address</h6>
                  <p class="card-text text-muted">${data.contact.address}</p>

              </div>
          </div>
      </div>
   </section>

    `;
    var infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    console.log(ngoData.size);
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: true,
      });
    });
    i++;
  });
}
setMarkers();
