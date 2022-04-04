// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  push,
  child,
  onValue,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAH0cGACFs08M3rrD3_swwDpltG2KzzzCY",
  authDomain: "gsolution-754c5.firebaseapp.com",
  projectId: "gsolution-754c5",
  storageBucket: "gsolution-754c5.appspot.com",
  messagingSenderId: "307270571076",
  appId: "1:307270571076:web:4f1c5083864fab91621811",
  measurementId: "G-PG6XWR2DPQ",
};

function scrollToBottom() {
  var totalHeight = document.getElementById("messages");
  totalHeight.scrollTo(0, totalHeight.scrollHeight);
}

const submit = document.getElementById("submit");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

var myName = sessionStorage.getItem("userName") || prompt("Enter your name");

sessionStorage.setItem("userName", myName);

submit.addEventListener("click", (e) => {
  var message = document.getElementById("message").value;
  var name = myName;

  const id = push(child(ref(database), "messages")).key;

  set(ref(database, "messages/" + id), {
    name: name,
    message: message,
  });
  document.getElementById("message").value = "";
  // alert("message has sent");
});

const newMsg = ref(database, "messages/");

onChildAdded(newMsg, (data) => {
  if (data.val().name != myName) {
    var divData = `<div
    class="receivedMessage text-start align-self-start bg-blue p-4 rounded rounded-3"
  >
    <div class="name h5">${data.val().name}</div>
    <div class="message text-start">${data.val().message}
    </div>
  </div>`;
    var d1 = document.getElementById("messages");
    d1.innerHTML += divData;
  } else {
    var divData = `<div
    class="sentMessage text-end align-self-end bg-lightblue p-4 rounded rounded-3"
  >
    <div class="name h5">${data.val().name}</div>
    <div class="message text-start">
    ${data.val().message}
    </div>
  </div>`;
    var d1 = document.getElementById("messages");
    d1.innerHTML += divData;
  }
});
