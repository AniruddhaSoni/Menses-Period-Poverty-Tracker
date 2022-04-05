import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  deleteUser,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAH0cGACFs08M3rrD3_swwDpltG2KzzzCY",
  authDomain: "gsolution-754c5.firebaseapp.com",
  projectId: "gsolution-754c5",
  storageBucket: "gsolution-754c5.appspot.com",
  messagingSenderId: "307270571076",
  appId: "1:307270571076:web:4f1c5083864fab91621811",
  measurementId: "G-PG6XWR2DPQ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// ------------------------------//

var ngoSchema = (name, phone, email, address, longitude, latitude) => ({
  name: name,
  contact: {
    phone: phone,
    email: email,
    address: address,
  },
  coordinates: {
    longitude: longitude,
    latitude: latitude,
  },
});
var latitude;
var longitude;

navigator.geolocation.getCurrentPosition(
  (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  },
  () => {
    alert("Please enable location services");
  }
);

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const email = document.getElementById("email").value;

      const address =
        document.getElementById("address").value +
        document.getElementById("zip").value;

      const user = userCredential.user;
      sessionStorage.setItem("userID", user.uid);
      console.log(ngoSchema(name, phone, email, address, longitude, latitude));
      setDoc(
        doc(db, "users", user.uid),
        ngoSchema(name, phone, email, address, longitude, latitude)
      )
        .then(() => {
          location.replace("map.html");
        })
        .catch(() => {
          setDoc(
            doc(db, "users", user.uid),
            ngoSchema(name, phone, email, address, longitude, latitude)
          );
          alert("something went wrong");
        });
    })

    .catch((error) => {
      document.getElementById("loader").style.display = "none";
      alert(error);
    });
}

const signupBtn = document.getElementById("signupBtn");
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

signupBtn.addEventListener("click", (e) => {
  document.getElementById("loader").style.display = "flex";
  signup();
});
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});
