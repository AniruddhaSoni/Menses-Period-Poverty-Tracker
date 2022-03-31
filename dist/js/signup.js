import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
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

var userSchema = (name, phone, email, location, role) => ({
  name: name,
  role: role,
  contact: {
    phone: phone,
    email: email,
    location: location,
  },
});
var ngoSchema = (name, phone, email, location, role, longitude, latitude) => ({
  name: name,
  role: role,
  contact: {
    phone: phone,
    email: email,
    location: location,
  },
  coordinates: {
    longitude: longitude,
    latitude: latitude,
  },
});

navigator.geolocation.getCurrentPosition(
  (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(latitude, longitude);
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
      const location = document.getElementById("location").value;
      const role = document.getElementById("role").value;

      const user = userCredential.user;
      sessionStorage.setItem("userID", user.uid);
      console.log(user.uid);

      setDoc(
        doc(db, "users", user.uid),
        role == "donor"
          ? ngoSchema(name, phone, email, location, role, longitude, latitude)
          : userSchema(name, phone, email, location, role)
      );
    })
    .then(() => {
      location.replace("map.html");
    })
    .catch((error) => {
      console.log(error);
    });
}

const signupBtn = document.getElementById("signupBtn");
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

signupBtn.addEventListener("click", (e) => {
  signup();
});
