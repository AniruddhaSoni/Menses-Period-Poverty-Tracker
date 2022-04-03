import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
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
const db = getFirestore(app);

var data;

window.addEventListener("load", () => {
  const docRef = doc(db, "users", sessionStorage.getItem("userID"));
  getDoc(docRef)
    .then((doc) => {
      data = doc.data();
      document.getElementById("name").value = data.name;
      document.getElementById("email").value = data.contact.email;
      document.getElementById("location").value = data.contact.address;
      document.getElementById("address").value = data.contact.address;
      if (data.bio) {
        document.getElementById("bio").value = data.bio;
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

document.getElementById("update").addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const location = document.getElementById("location").value;
  const bio = document.getElementById("bio").value;

  const docRef = doc(db, "users", sessionStorage.getItem("userID"));
  setDoc(docRef, {
    name: name,
    contact: {
      email: email,
      phone: data.contact.phone,
      address: address,
      location: location,
    },
    role: sessionStorage.getItem("userRole"),
    bio: bio,
  }).then(() => {
    alert("done");
  });
});
