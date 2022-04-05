import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import firebaseConfig from "./firebase.js";

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
