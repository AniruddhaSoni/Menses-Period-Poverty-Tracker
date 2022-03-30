import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
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

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      sessionStorage.setItem("userID", user.uid);
      console.log(user.uid);

      const docRef = doc(db, "users", user.id);

      //adding data to firestore
      setDoc(docRef, {
        name: name,
        email: email,
        password: password,
        id: user.uid,
      });

      // location.replace("profile.html");
    })
    .catch((error) => {
      const errorCode = error.code;
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
