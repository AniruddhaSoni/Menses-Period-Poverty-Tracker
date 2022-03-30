document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

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

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      sessionStorage.setItem("userID", user.uid);
      location.replace("profile.html");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode);
    });
}

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("login");
  login();
});
